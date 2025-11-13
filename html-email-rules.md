# HTML Email Template Generation Rules

Use these rules **every time** you generate an HTML email template.

Your goal: **produce a rock-solid, backward-compatible HTML email** that renders acceptably in:
- Old and new Outlook (desktop + web)
- Gmail (web + mobile)
- Apple Mail / iOS Mail
- Android mail clients
- Other random/legacy clients

---

## 1. Output format

1. Always output a **single, complete HTML document**:
   - Starts with `<!DOCTYPE html>` and `<html>` tag.
   - Contains `<head>` and `<body>`.
   - No external dependencies (no external CSS, JS, fonts).
2. Do **not** include a text version; HTML only.
3. Do **not** wrap the HTML in Markdown code fences in the final answer (unless explicitly requested by the user at runtime).

---

## 2. General constraints

1. Assume support is **worse than a 2005 browser**.
2. **Layout must be table-based**, not div-based:
   - Use nested `<table>`, `<tr>`, `<td>` for structure.
3. **No JavaScript**:
   - Do not include `<script>` tags.
   - Do not use inline JS like `onclick`, `onload`, etc.
4. **No external resources except images**:
   - No `<link rel="stylesheet">`.
   - No `<iframe>`, `<embed>`, `<object>`.
5. **No forms**:
   - Do not use `<form>`, `<input>`, `<select>`, `<textarea>` etc.
6. **No video/audio embedding**:
   - No `<video>`, `<audio>`.
   - Use an image thumbnail that links to a web page instead.
7. Keep structure simple:
   - Prefer **1 main column**, optional secondary sections but avoid complex multi-column layouts.

---

## 3. Document structure

Every template must follow this structure:

1. `<!DOCTYPE html>` at the top.
2. `<html lang="en">` (or another language if specified).
3. `<head>` must contain at least:
   - `<meta charset="utf-8">`
   - `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
   - `<meta http-equiv="X-UA-Compatible" content="IE=edge">`
   - `<title>…</title>`
   - Optional `<style>` block for basic classes and media queries (see CSS rules).
4. `<body>` must:
   - Set default background and reset margins:
     ```html
     <body style="margin:0; padding:0; background-color:#f3f3f3;">
     ```
   - Wrap content in a **full-width outer table** (`width="100%"`) with a centered **inner container table** of about **600px** width.

Example frame (you must follow this pattern):

```html
<body style="margin:0; padding:0; background-color:#f3f3f3;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f3f3f3">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px; max-width:600px;">
          <!-- sections as <tr><td> blocks go here -->
        </table>
      </td>
    </tr>
  </table>
</body>
