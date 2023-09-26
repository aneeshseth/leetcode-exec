# Leetcode like Excecution Environment

# Overview

This project provides a LeetCode-type code execution environment where code can be submitted to a backend route, added to a Docker volume, and executed within a Docker container, all orchestrated through a Docker Compose file. The system allows users to submit code, which is then placed in a Docker volume accessible by a container. The container processes the code and returns the output of the code execution.

# How it Works

Code Submission: Users submit their code to a designated backend route. 

Volume Management: The submitted code is added to a Docker volume, which acts as shared storage between the host and the container.

Container Creation: A Docker container created with the volume mounted accesses the submitted code.

Code Execution: The container processes the submitted code within the mounted volume.

Output Retrieval: The output of the code execution is captured.

<img width="1238" alt="image" src="https://github.com/aneeshseth/leetcode-exec/assets/122401851/5f90fe92-3712-4d91-bb41-70c8fe0206db">



