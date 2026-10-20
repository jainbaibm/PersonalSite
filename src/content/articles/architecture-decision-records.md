---
title: Architecture Decision Records: a lightweight governance habit
summary: ADRs capture why a design looks the way it does. Used well, they speed up reviews instead of slowing teams down.
date: 2026-10-19
category: Architecture Leadership
tags: ADR, Governance, Design reviews
draft: true
---

Every long-lived system eventually reaches the moment when someone asks, *"Why did we build it this way?"* — and nobody in the room knows. The original reasoning lived in a meeting, a chat thread or one person's head.

An **Architecture Decision Record (ADR)** is a short document that captures a single significant decision, the context in which it was made, and its consequences. It is one of the cheapest governance tools available, and one of the most useful.

## What makes a decision "significant"?

Not every choice needs an ADR. A good rule of thumb: write one when a decision is **expensive to reverse** or **affects more than one team**. Typical examples:

- Choosing an integration style (synchronous API vs. events) between domains.
- Selecting a data store or messaging platform.
- Defining an authentication or authorization model.
- Adopting a shared platform service that many teams depend on.

## A minimal template

Keep the template small enough that people actually use it:

```markdown
# ADR-012: Use managed Kafka for order events

## Status
Accepted — 2026-10-01

## Context
What problem are we solving? What constraints and forces apply?

## Options considered
1. Option A — pros / cons
2. Option B — pros / cons

## Decision
What we chose, stated plainly.

## Consequences
What becomes easier, what becomes harder, and what we must follow up on.
```

See a [complete sample ADR](/architecture-lab/adr-event-streaming-vs-queue/) in the Architecture Lab.

## How ADRs make reviews faster

In formal review settings such as an Enterprise Review Board, much of the time goes into reconstructing context. When decisions are already written down with the alternatives considered, the conversation shifts from *"What are you proposing?"* to *"Do we agree with the trade-off?"* — a much better use of senior people's time.

```mermaid
flowchart LR
  P[Problem identified] --> D[Draft ADR]
  D --> R[Peer review]
  R -->|changes| D
  R --> B[Architecture review board]
  B --> A[Accepted]
  A --> S[Superseded later?]
```

## Practical tips

1. **Store ADRs next to the code** in the repository, so they are versioned and discoverable.
2. **Never edit an accepted ADR's decision** — supersede it with a new one and link the two.
3. **Write the consequences honestly**, including the negative ones. That is where the real value lies.
4. **Timebox them.** Most ADRs should take under an hour to write.

## Closing thought

Architecture governance earns its reputation for slowing teams down when it is about approval rather than understanding. ADRs flip that: they make reasoning visible, reviewable and reusable.

> **Draft / demo article.** This piece illustrates the blog format and reflects general practice; replace or extend it with your own published writing.
