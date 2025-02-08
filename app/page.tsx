"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { fadeInUp, staggerChildren } from "@/lib/animations"

export default function Home() {
  return (
    <motion.div className="container mx-auto" initial="initial" animate="animate" variants={staggerChildren}>
      <motion.h1 className="text-3xl font-bold mb-6" variants={fadeInUp}>
        Welcome to AI Assistant
      </motion.h1>
      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={staggerChildren}>
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle>AI Agent</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Use our AI Agent to perform various tasks and get intelligent responses.</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle>AI Chatbot</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Chat with our AI-powered chatbot for interactive conversations and assistance.</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

