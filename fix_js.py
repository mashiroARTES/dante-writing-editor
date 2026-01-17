#!/usr/bin/env python3
with open('/home/user/webapp/public/static/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace \` (backslash followed by backtick) with just `
content = content.replace('\\`', '`')

with open('/home/user/webapp/public/static/app.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('Fixed!')
