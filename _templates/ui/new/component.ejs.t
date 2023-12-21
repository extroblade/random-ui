---
to: src/shared/ui/<%= name %>/<%= name %>.tsx
---
<% name = name || 'unnamed'
   Name = h.capitalize(name)
%>import s from './<%= Name %>.module.css';

export const <%= Name %> = () => <div className={s.<%= name %>}><%= name %>!</div>;
