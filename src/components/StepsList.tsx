'use client'

import { useState } from 'react'
import type { Recipe } from '@/payload-types'
import './StepsList.css'

interface StepsListProps {
  steps: Recipe['steps']
}

export default function StepsList({ steps }: StepsListProps) {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())

  if (!steps || steps.length === 0) {
    return <p>No steps listed</p>
  }

  const toggleStep = (index: number) => {
    const newCompleted = new Set(completedSteps)
    if (newCompleted.has(index)) {
      newCompleted.delete(index)
    } else {
      newCompleted.add(index)
    }
    setCompletedSteps(newCompleted)
  }

  return (
    <ol className="steps-list">
      {steps.map((step, index) => (
        <li
          key={step.id || index}
          className={`step-item ${completedSteps.has(index) ? 'completed' : ''}`}
          onClick={() => toggleStep(index)}
        >
          <div className="step-header">
            <div className="step-number">
              <input
                type="checkbox"
                checked={completedSteps.has(index)}
                onChange={() => toggleStep(index)}
                onClick={(e) => e.stopPropagation()}
              />
              <span>{(step.stepNumber || index + 1)}</span>
            </div>

            {step.image && typeof step.image === 'object' && (
              <div className="step-image-thumbnail">
                <img src={step.image.url || ''} alt={`Step ${index + 1}`} loading="lazy" />
              </div>
            )}
          </div>

          <div className="step-content">
            {/* Extract text from Lexical JSON instruction */}
            <p className="step-instruction">{extractTextFromLexical(step.instruction)}</p>

            {step.image && typeof step.image === 'object' && (
              <div className="step-image-full">
                <img src={step.image.url || ''} alt={`Step ${index + 1}`} loading="lazy" />
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}

/**
 * Extract plain text from Lexical JSON format
 * Used to render step instructions which are stored as rich text
 */
function extractTextFromLexical(lexicalJSON: any): string {
  if (!lexicalJSON || !lexicalJSON.root) {
    return ''
  }

  const texts: string[] = []

  function traverse(node: any) {
    if (!node) return

    if (Array.isArray(node)) {
      node.forEach(traverse)
      return
    }

    if (node.children && Array.isArray(node.children)) {
      node.children.forEach(traverse)
    }

    if (node.text) {
      texts.push(node.text)
    }
  }

  traverse(lexicalJSON.root)
  return texts.join('')
}
