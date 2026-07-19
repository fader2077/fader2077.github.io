---
title: Edge AI Object Detection on KV260
slug: edge-ai-object-detection-kv260
summary: INT8 object-detection deployment work using the KV260, Vitis AI, and a DPU inference pipeline.
status: published
featured: true
featuredOrder: 1
role: Research contributor
visibility: public
category: Edge AI
technologies: [YOLOv5, Vitis AI, KV260, INT8]
updatedAt: 2026-07-20
---
## Problem
Explore how an object-detection model can move from training artifacts to an embedded accelerator workflow.
## My Role
Integrated the model, quantization workflow, and target-board inference path described in the legacy portfolio.
## System Architecture
The documented path connects YOLOv5 artifacts, INT8 quantization, Vitis AI compilation, and KV260 DPU execution.
## Data and Experimental Setup
The legacy site does not identify the dataset split or benchmark protocol; both require verification.
## Technical Decisions
INT8 deployment and the vendor DPU toolchain were selected for edge execution.
## Evaluation
No public metric is reported until benchmark evidence is available.
## Results
The migrated record confirms an implemented deployment workflow, not a verified performance number.
## Limitations
Input resolution, board mode, timing method, and accuracy impact remain undocumented.
## Artifacts
No public repository or report URL has been verified.
## What I Would Improve
Publish reproducible build instructions, model hashes, accuracy results, latency distribution, power use, and a benchmark log.
