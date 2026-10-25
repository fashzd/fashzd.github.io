"use strict";

document.documentElement.classList.add("js");

// Core content and external links work without JavaScript.
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
menuToggle.hidden = false;

function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  navLinks.classList.remove("is-open");
}

menuToggle.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(expanded));
  navLinks.classList.toggle("is-open", expanded);
});
navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menuToggle.focus();
  }
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".nav")) closeMenu();
});
window.matchMedia("(min-width: 701px)").addEventListener("change", closeMenu);

const systemPanel = document.querySelector(".system-panel");
if (systemPanel) {
  const stageDescriptions = {
    context: "Ground every response in the right files, memory, and knowledge.",
    reason: "Connect the model to the right tools, with clear output contracts.",
    action: "Keep people in control. Review and approve before taking action.",
  };
  document.querySelector(".system-controls").hidden = false;
  document.querySelectorAll("[data-stage-button]").forEach((button) => {
    button.addEventListener("click", () => {
      systemPanel.dataset.stage = button.dataset.stageButton;
      document.querySelectorAll("[data-stage-button]").forEach((item) => {
        item.setAttribute("aria-pressed", String(item === button));
      });
      const marker = document.createElement("span");
      marker.className = "description-marker";
      marker.setAttribute("aria-hidden", "true");
      marker.textContent = "↳";
      document.querySelector("[data-stage-description]").replaceChildren(marker, document.createTextNode(stageDescriptions[button.dataset.stageButton]));
    });
  });
}

document.querySelector(".project-filters")?.removeAttribute("hidden");
document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    let count = 0;
    document.querySelectorAll("[data-category]").forEach((card) => {
      card.hidden = button.dataset.filter !== "all" && card.dataset.category !== button.dataset.filter;
      if (!card.hidden) count += 1;
    });
    document.querySelectorAll("[data-filter]").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
    document.querySelector(".project-count").textContent = `${count} selected project${count === 1 ? "" : "s"}`;
  });
});

const projectDetails = {
  bb8: {
    title: "BB-8 Desktop Assistant",
    kicker: "01 / AGENTIC DESKTOP APPLICATION",
    intro: "A context-aware desktop assistant built with Electron, React, and Node.js. Conversation, persistent memory, local files, and Notion knowledge come together in an interface designed around human control.",
    challenge: "Make an AI assistant useful beyond a single chat. It needs relevant context, connected knowledge, and a clear boundary between suggesting an action and carrying it out.",
    decisions: ["Persistent memory and local file context for source-aware conversations.", "Notion connectivity through MCP and approval-based desktop workflows.", "Secure API key handling and separation between the renderer and main process.", "Iterative UX refinement, testing, and packaging for macOS."],
    repo: "https://github.com/fashzd/BB-8-Agentic-APP",
    screenshots: [
      { label: "Chat", file: "assets/projects/bb8/bb8-chat.png", caption: "The desktop chat interface and knowledge source panel." },
      { label: "Local files", file: "assets/projects/bb8/bb8-workspace-files.png", caption: "Connecting local workspace files as context for the assistant." },
      { label: "Notion", file: "assets/projects/bb8/bb8-notion-search.png", caption: "Finding connected knowledge through Notion MCP." },
      { label: "AI settings", file: "assets/projects/bb8/bb8-ai-settings.png", caption: "AI configuration and model integration settings." },
      { label: "Memory", file: "assets/projects/bb8/bb8-memory.png", caption: "Persistent memory controls for ongoing assistant context." },
    ],
  },
  triage: {
    title: "Triage Copilot",
    kicker: "02 / PROPERTY MANAGEMENT WORKFLOW",
    intro: "A review-first maintenance triage MVP for U.S. residential property management teams. Tenant messages become structured urgency, category, trade, missing information, resident replies, and dispatch summaries.",
    challenge: "Give property coordinators a consistent way to make sense of unstructured maintenance reports, while prioritizing emergency detection and keeping dispatch decisions in human hands.",
    decisions: ["Deterministic emergency rules alongside OpenAI-backed model integration.", "Fallback behavior and structured-output validation.", "Persistent tickets, work queues, review decisions, and audit storage.", "A coordinator workspace for editing, approving, or rejecting the proposed output."],
    repo: "https://github.com/fashzd/Tirage_Copilot_LMM_Property-Manager-DEMO-",
    screenshots: [
      { label: "Inbox", file: "assets/projects/triage-copilot/coordinator-inbox.png", caption: "The coordinator inbox, with maintenance tickets and review controls." },
      { label: "Work queue", file: "assets/projects/triage-copilot/work-queue.png", caption: "A persistent work queue for triaged maintenance requests." },
      { label: "Review", file: "assets/projects/triage-copilot/review-workspace.png", caption: "The human review workspace for proposed triage decisions." },
      { label: "Detail", file: "assets/projects/triage-copilot/review-detail.png", caption: "Detailed triage output and review information." },
      { label: "Pending", file: "assets/projects/triage-copilot/pending-review.png", caption: "Requests awaiting a coordinator’s review." },
    ],
  },
  support: {
    title: "Customer Support Copilot",
    kicker: "03 / FULL-STACK INTERNAL AI APPLICATION",
    intro: "An ecommerce support copilot for human operators. It classifies inbound tickets, drafts suggested replies, identifies missing information, and recommends escalation while preserving review history.",
    challenge: "Help a support agent get from an incoming ticket to a safe, reviewable reply. Model output needs to be constrained, validated, and traceable before an operator relies on it.",
    decisions: ["Structured JSON output contracts with JSON Schema-based backend validation.", "Traceable fallbacks when the model returns invalid output.", "Node.js API endpoints and SQLite-backed review and action history.", "Sample-ticket QA flows, automated tests, and a lightweight vanilla JavaScript interface."],
    repo: "https://github.com/fashzd/LLM_APP_Customer_Support_COPILOT",
    screenshots: [
      { label: "Console", file: "assets/projects/customer-support-copilot/operations-console.png", caption: "The operations console for incoming support tickets." },
      { label: "Samples", file: "assets/projects/customer-support-copilot/sample-picker.png", caption: "Sample tickets for QA and manual exploration." },
      { label: "Analysis", file: "assets/projects/customer-support-copilot/analysis-output.png", caption: "Structured ticket analysis, suggested replies, and escalation information." },
      { label: "History", file: "assets/projects/customer-support-copilot/review-history.png", caption: "Persistent review history for operational traceability." },
      { label: "Review", file: "assets/projects/customer-support-copilot/review-action-saved.png", caption: "A saved operator review action." },
    ],
  },
};

const dialog = document.querySelector(".project-dialog");
let dialogTrigger = null;
function showScreenshot(project, index) {
  const screenshot = project.screenshots[index];
  const image = dialog.querySelector("[data-dialog-image]");
  image.src = screenshot.file;
  image.alt = `${project.title}: ${screenshot.caption}`;
  image.removeAttribute("width");
  image.removeAttribute("height");
  dialog.querySelector("[data-dialog-caption]").textContent = screenshot.caption;
  dialog.querySelectorAll(".gallery-tabs button").forEach((button, buttonIndex) => button.setAttribute("aria-pressed", String(buttonIndex === index)));
}

function openProject(projectId, trigger) {
  const project = projectDetails[projectId];
  if (!project) return;
  dialogTrigger = trigger;
  dialog.querySelector("#dialog-title").textContent = project.title;
  dialog.querySelector("[data-dialog-kicker]").textContent = project.kicker;
  dialog.querySelector("[data-dialog-intro]").textContent = project.intro;
  dialog.querySelector("[data-dialog-repo]").href = project.repo;
  const challenge = document.createElement("div");
  const challengeTitle = document.createElement("h3");
  challengeTitle.textContent = "The challenge";
  const challengeCopy = document.createElement("p");
  challengeCopy.textContent = project.challenge;
  challenge.append(challengeTitle, challengeCopy);
  const engineering = document.createElement("div");
  const engineeringTitle = document.createElement("h3");
  engineeringTitle.textContent = "Engineering decisions";
  const decisions = document.createElement("ul");
  project.decisions.forEach((decision) => {
    const item = document.createElement("li");
    item.textContent = decision;
    decisions.append(item);
  });
  engineering.append(engineeringTitle, decisions);
  dialog.querySelector("[data-dialog-case-study]").replaceChildren(challenge, engineering);
  const tabs = dialog.querySelector(".gallery-tabs");
  tabs.replaceChildren();
  project.screenshots.forEach((screenshot, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = screenshot.label;
    button.setAttribute("aria-pressed", String(index === 0));
    button.addEventListener("click", () => showScreenshot(project, index));
    tabs.append(button);
  });
  showScreenshot(project, 0);
  dialog.showModal();
  dialog.scrollTop = 0;
  document.body.classList.add("modal-open");
  dialog.querySelector(".dialog-close").focus({ preventScroll: true });
}

if (typeof dialog?.showModal === "function") {
  document.querySelectorAll("[data-open-project]").forEach((button) => {
    button.hidden = false;
    button.addEventListener("click", (event) => {
      event.preventDefault();
      openProject(button.dataset.openProject, button);
    });
  });
}
dialog?.querySelector(".dialog-close")?.addEventListener("click", () => dialog.close());
dialog?.addEventListener("click", (event) => {
  if (event.target === dialog) {
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  }
});
dialog?.addEventListener("close", () => {
  document.body.classList.remove("modal-open");
  dialogTrigger?.focus({ preventScroll: true });
});

const certificateDialog = document.querySelector(".certificate-dialog");
let certificateTrigger = null;
if (typeof certificateDialog?.showModal === "function") {
  document.querySelectorAll("[data-certificate]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const card = link.closest(".certificate-card");
      const title = card.querySelector("h3").textContent;
      const original = link.getAttribute("href");
      certificateTrigger = link;
      certificateDialog.querySelector("#certificate-dialog-title").textContent = title;
      const image = certificateDialog.querySelector("[data-certificate-full-image]");
      image.src = original;
      image.alt = `${title}: original certificate of completion awarded to Fatin Ruhul Shahazad`;
      certificateDialog.querySelector("[data-certificate-source]").href = card.querySelector("[data-certificate-verify]").href;
      const download = certificateDialog.querySelector("[data-certificate-download]");
      download.href = original;
      download.download = card.querySelector("a[download]").download;
      certificateDialog.showModal();
      certificateDialog.scrollTop = 0;
      document.body.classList.add("modal-open");
      certificateDialog.querySelector("[data-close-certificate]").focus({ preventScroll: true });
    });
  });
  certificateDialog.querySelector("[data-close-certificate]").addEventListener("click", () => certificateDialog.close());
  certificateDialog.addEventListener("click", (event) => {
    if (event.target !== certificateDialog) return;
    const bounds = certificateDialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) certificateDialog.close();
  });
  certificateDialog.addEventListener("close", () => {
    document.body.classList.remove("modal-open");
    certificateTrigger?.focus({ preventScroll: true });
  });
}

const copyButton = document.querySelector(".copy-email");
if (copyButton && window.isSecureContext && navigator.clipboard?.writeText) {
  copyButton.hidden = false;
  let copyFeedbackTimeout;
  copyButton.addEventListener("click", async () => {
    const status = document.querySelector(".copy-status");
    try {
      await navigator.clipboard.writeText("fatinruhul@gmail.com");
      status.textContent = "Copied!";
    } catch {
      status.textContent = "Select the address to copy.";
    }
    clearTimeout(copyFeedbackTimeout);
    copyFeedbackTimeout = setTimeout(() => { status.textContent = ""; }, 3000);
  });
}

document.querySelector("[data-year]").textContent = String(new Date().getFullYear());
if ("IntersectionObserver" in window) {
  const sections = document.querySelectorAll("#top, #projects, #hackathons, #skills, #about, #contact");
  let observer;
  function observeSections() {
    observer?.disconnect();
    // A one-pixel reading line below the sticky header, independent of screen width.
    const readingLine = 120;
    const bottomInset = Math.max(0, window.innerHeight - readingLine - 1);
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        document.querySelectorAll("[data-nav]").forEach((link) => {
          const active = link.dataset.section === entry.target.id || link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("is-current", active);
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: `-${readingLine}px 0px -${bottomInset}px 0px`, threshold: 0 });
    sections.forEach((section) => observer.observe(section));
  }
  observeSections();
  window.addEventListener("resize", observeSections);
}
