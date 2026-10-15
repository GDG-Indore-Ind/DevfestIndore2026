"use client";

import React from "react";

// Crisp, high-resolution official vector logos with standard dimensions

export function GoogleCloudLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#4285F4"/>
      <path d="M19 19H6c-2.76 0-5-2.24-5-5 0-2.64 2.05-4.78 4.65-4.96.2-.01.39-.04.59-.04 1.15 0 2.22.42 3.06 1.11l1.7-1.7C9.36 7.6 7.78 7 6 7 2.69 7 0 9.69 0 13c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-1.84-.99-3.44-2.48-4.31-.38.83-.93 1.57-1.62 2.16.71.56 1.1 1.41 1.1 2.15 0 1.66-1.34 3-3 3z" fill="#34A853" opacity="0.3"/>
    </svg>
  );
}

export function FirebaseLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.09 17.51l2.42-15.11a.84.84 0 0 1 1.55-.26l3.52 6.64-7.49 8.73z" fill="#FFC24A"/>
      <path d="M13.9 11.23l-2.42-4.57-7.39 10.85 9.81-6.28z" fill="#FFA712"/>
      <path d="M19.91 17.51l-4.73-10.43a.84.84 0 0 0-1.52-.07l-2.08 3.96 8.33 6.54z" fill="#FFC24A"/>
      <path d="M19.91 17.51l-7.91 4.43a.84.84 0 0 1-.82 0l-7.09-4.43 7.5 4.38a.84.84 0 0 0 .82 0l7.5-4.38z" fill="#F4BD62"/>
      <path d="M4.09 17.51l7.5 4.38a.84.84 0 0 0 .82 0l7.5-4.38-7.91-15.35a.84.84 0 0 0-1.52.07L4.09 17.51z" fill="#F57C00"/>
    </svg>
  );
}

export function GeminiLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gemini-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1BA1E3" />
          <stop offset="50%" stopColor="#5B5BD6" />
          <stop offset="100%" stopColor="#C155E6" />
        </linearGradient>
      </defs>
      <path
        d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z"
        fill="url(#gemini-grad)"
      />
    </svg>
  );
}

export function FlutterLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.31 0L4.72 9.59l3.58 3.58L21.47 0h-7.16z" fill="#42A5F5" />
      <path d="M14.31 10.74L8.3 16.75l5.98 5.98h7.19l-9.57-9.57-1.18 1.18 3.59-3.6z" fill="#02569B" />
      <path d="M8.3 16.75l3.58 3.58 2.4-2.4-3.58-3.58-2.4 2.4z" fill="#01579B" />
      <path d="M14.31 10.74l-3.58 3.58 3.58 3.58 3.58-3.58-3.58-3.58z" fill="#29B6F6" />
    </svg>
  );
}

export function AndroidLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fill="#3DDC84" d="M16.61 6.16l1.62-2.8a.5.5 0 1 0-.86-.5l-1.66 2.87A10.23 10.23 0 0 0 12 5.25c-1.32 0-2.58.26-3.71.72L6.63 3.1a.5.5 0 0 0-.86.5l1.62 2.8A9.78 9.78 0 0 0 3 13.5h18c0-3.05-1.74-5.72-4.39-7.34zM7.5 10.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm9 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
    </svg>
  );
}

export function SatelliteLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 7 9 3 5 7l4 4" stroke="#4285F4" />
      <path d="m17 11 4 4-4 4-4-4" stroke="#4285F4" />
      <path d="m8 12 4 4 6-6-4-4Z" stroke="#F9AB00" fill="#F9AB00" fillOpacity="0.2" />
      <path d="m16 8 3-3" stroke="#EA4335" />
      <path d="M9 21a6 6 0 0 0-6-6" stroke="#34A853" />
      <path d="M7 21a4 4 0 0 0-4-4" stroke="#34A853" />
    </svg>
  );
}

export function KubernetesLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z" fill="#326CE5" />
      <path d="M12 5.5l5.63 3.25v6.5L12 18.5l-5.63-3.25v-6.5L12 5.5z" stroke="#FFFFFF" strokeWidth="1.2" />
      <circle cx="12" cy="12" r="2.5" fill="#FFFFFF" />
    </svg>
  );
}

export function GitHubLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export function JetBrainsLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="jb-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F98000" />
          <stop offset="50%" stopColor="#F50057" />
          <stop offset="100%" stopColor="#7E57C2" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="4" fill="#000000" />
      <path d="M3 21h8L21 9V3H9L3 21z" fill="url(#jb-grad)" opacity="0.9" />
      <rect x="5" y="5" width="7" height="2" fill="#FFFFFF" />
      <rect x="5" y="16" width="10" height="2" fill="#FFFFFF" />
    </svg>
  );
}

export function TensorFlowLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M12 2.25L4.5 6.58v8.66l7.5 4.33 7.5-4.33V6.58L12 2.25z" fill="#FF6F00" />
      <path d="M12 2.25v17.32l5.63-3.25V7.66L12 2.25z" fill="#FFA000" />
      <path d="M12 10.91l-4.5-2.6v5.2l4.5 2.6v-5.2z" fill="#FFFFFF" opacity="0.9" />
    </svg>
  );
}

export function NextjsLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1.22-6.574v-6.852h1.49l4.53 5.867v-5.867h1.49v6.852h-1.49l-4.53-5.867v5.867h-1.49z" />
    </svg>
  );
}

export function DiasparkLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#0052CC" opacity="0.15" />
      <path d="M7 6h5a5 5 0 0 1 5 5v2a5 5 0 0 1-5 5H7V6z" stroke="#0052CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 10h1.5a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2H11v-4z" fill="#0052CC" />
    </svg>
  );
}

export function QuillBotLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="#48B34A" opacity="0.15" />
      <path d="M19 4L7 16l-3 4 4-3L20 5a1.4 1.4 0 0 0-1-1z" fill="#48B34A" />
      <path d="M13 8l3 3" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function MSILogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4" fill="#E10600" opacity="0.15" />
      <path d="M4 14l3-6 3 6M10 14V8l4 6V8M17 8h3v6h-3" stroke="#E10600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function GenieTalkLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#6C5CE7" opacity="0.15" />
      <path d="M7 9a4 4 0 0 1 8 0c0 2-2 3-2 5h-4c0-2-2-3-2-5z" fill="#6C5CE7" />
      <path d="M10 17h4" stroke="#6C5CE7" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="8" r="1" fill="#FFFFFF" />
    </svg>
  );
}

export function SoftudeLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="#00A8FF" opacity="0.15" />
      <path d="M17 8a4 4 0 0 0-7-2 4 4 0 0 0-4 4 4 4 0 0 0 0 8h11a3 3 0 0 0 0-6 4 4 0 0 0 0-4z" fill="#00A8FF" />
    </svg>
  );
}

export function ProtonsHubLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#FF7675" opacity="0.15" />
      <ellipse cx="12" cy="12" rx="8" ry="3" stroke="#D63031" strokeWidth="1.5" transform="rotate(30 12 12)" />
      <ellipse cx="12" cy="12" rx="8" ry="3" stroke="#D63031" strokeWidth="1.5" transform="rotate(-30 12 12)" />
      <circle cx="12" cy="12" r="2.5" fill="#D63031" />
    </svg>
  );
}

export function GraffersIDLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="#F39C12" opacity="0.15" />
      <path d="M6 8h12M6 12h8M6 16h10" stroke="#E67E22" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function CodingBlocksLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4" fill="#2ECC71" opacity="0.15" />
      <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13 7l-2 10" stroke="#27AE60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

