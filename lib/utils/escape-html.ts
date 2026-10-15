const escapes: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

/** Escape user-provided text for HTML e-mail bodies and XML feeds. */
export const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => escapes[char]);
