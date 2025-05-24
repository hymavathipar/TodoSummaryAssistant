import React, { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import AddTodo from "./components/AddTodo";
import AllTodos from "./components/AllTodos";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { Bot as Brain } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [summary, setSummary] = useState("");
  const [open, setOpen] = useState(false);
  const [isCheckingBackend, setIsCheckingBackend] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/todos`);
      setTodos(res.data);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };

  const handleSummarize = async () => {
    const loadingToastId = toast.loading("Summarizing...");
    if (todos.length === 0) {
      toast.dismiss(loadingToastId);
      toast.error("No todos to summarize");
      return;
    }
    try {
      const res = await axios.post(`${API_BASE_URL}/summarize`);
      setSummary(res.data.summary);
      setOpen(true);
      toast.success("Summary sent to Slack!");
    } catch (err) {
      toast.error("Failed to summarize");
    } finally {
      toast.dismiss(loadingToastId);
    }
  };

  const checkBackend = async () => {
    setIsCheckingBackend(true);
    const loadingToastId = toast.loading("Checking backend...");
    try {
      await axios.get(`${API_BASE_URL}/`);
    } catch (err) {
      toast.error("Backend unreachable");
    } finally {
      toast.dismiss(loadingToastId);
      setIsCheckingBackend(false);
    }
  };

  useEffect(() => {
    checkBackend();
    fetchTodos();
  }, []);

  return (
    <div
      className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1470&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Toaster position="top-center" />

      <div className="bg-white rounded-3xl shadow-xl max-w-7xl w-full p-16 flex flex-col space-y-10">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-6xl font-extrabold text-gray-900 mb-3">
            🧠 Todo Summary Assistant
          </h1>
          <p className="text-xl text-gray-600">
            Organize your tasks. Summarize with AI. Send summaries to Slack.
          </p>
        </header>

        {/* Add Todo Section */}
        <section>
          <AddTodo onAdd={fetchTodos} />
        </section>

        {/* Summarize Button */}
        <section className="flex justify-center">
          <Button
            className="flex items-center gap-3 px-8 py-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xl rounded-lg shadow-md transition"
            onClick={handleSummarize}
            disabled={isCheckingBackend}
          >
            <Brain size={28} />
            {isCheckingBackend ? "Checking backend..." : "Summarize Todos"}
          </Button>
        </section>

        {/* Todo List */}
        <section>
          <AllTodos todos={todos} refreshTodos={fetchTodos} />
        </section>
      </div>

      {/* Summary Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-xl bg-white rounded-xl shadow-lg p-8 border border-gray-300 text-gray-900">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold">🧠 Summary</DialogTitle>
            <DialogDescription className="mt-4 whitespace-pre-line text-lg">
              {summary || "No summary available."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-8 flex justify-end">
            <Button
              className="px-6 py-3 text-lg font-semibold"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
          {summary && (
            <p className="text-center mt-4 text-sm text-gray-500">
              A copy has been sent to Slack.
            </p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default App;
