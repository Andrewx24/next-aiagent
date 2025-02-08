"use client"

import { useState } from "react"
import type React from "react" // Added import for React
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"

export function AIAgent() {
  const [task, setTask] = useState("")
  const [result, setResult] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!task.trim()) {
      setError("Please enter a task")
      return
    }
    setError("")
    setIsLoading(true)
    setResult("")
    try {
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task }),
      })
      if (!response.ok) {
        throw new Error("Failed to process the task")
      }
      const data = await response.json()
      setResult(data.result)
    } catch (error) {
      console.error("Error:", error)
      setError("An error occurred while processing your request.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>AI Agent</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a task for the AI agent"
            aria-label="Task for AI agent"
          />
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Submit Task"
            )}
          </Button>
        </form>
        {error && (
          <p className="text-red-500 mt-2" role="alert">
            {error}
          </p>
        )}
      </CardContent>
      <AnimatePresence>
        {(isLoading || result) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CardFooter>
              <div className="w-full">
                <h3 className="font-semibold mb-2">Result:</h3>
                {isLoading ? (
                  <Skeleton className="w-full h-20" />
                ) : (
                  <p className="text-sm whitespace-pre-wrap">{result}</p>
                )}
              </div>
            </CardFooter>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

