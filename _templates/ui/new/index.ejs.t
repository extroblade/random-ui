---
to: src/shared/ui/<%= name %>/index.tsx
---
<% name = name || 'unnamed'
   Name = h.capitalize(name)
%>export { <%= Name %> } from './<%= name %>';
