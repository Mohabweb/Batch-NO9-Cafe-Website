---
name: GitHub push verification
description: Check whether a commit reached GitHub through another sync after a local push fails.
---

After a CLI push fails, do not assume the commit is absent from GitHub. Another sync may have advanced the remote branch. Fetch and check the actual remote head and commit ancestry before retrying; never force-push just to reconcile a stale local tracking ref.

**Why:** A local push failed authentication, but GitHub's current branch later contained the requested commit as an ancestor of a newer commit.

**How to apply:** Verify the remote ref directly, confirm the target commit is an ancestor, and fast-forward the local branch when safe. Use the attached GitHub integration for read-only inspection if CLI authentication is unavailable.