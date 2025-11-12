# Lumo - The Floating Friend 🎈

A smooth, continuous animation of a glowing, blob-like character inspired by Microsoft Copilot's "Mico". Features a friendly, animated blob with subtle facial expressions, particle effects, and interactive cursor following.

## ✨ Features

- **Glowing Blob Animation**: Peach/golden gradient blob with soft glow effects
- **Facial Expressions**: Animated eyes with blinking and mouth with subtle movements
- **Smooth Floating**: Gentle up-and-down floating motion with breathing-like deformation
- **Morphing Animation**: Continuous shape morphing for organic movement
- **Particle Sparkles**: Subtle particle effects around the blob
- **Cursor Following**: Interactive cursor following with smooth easing
- **Eye Tracking**: Pupils follow cursor movement
- **Responsive Design**: Optimized for all screen sizes
- **Performance Optimized**: Smooth 60fps animations using CSS transforms and requestAnimationFrame

## 🚀 Getting Started

### Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/suraj991/Lumo-The-Floating-Friend.git
   cd Lumo-The-Floating-Friend
   ```

2. Open `index.html` in your web browser:
   - Simply double-click the file, or
   - Right-click and select "Open with" your preferred browser

### Using a Local Server (Optional)

For the best experience, you can use a local web server:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server -p 8000
```

Then open `http://localhost:8000` in your browser.

## 📁 File Structure

```
Lumo-The-Floating-Friend/
├── index.html      # Main HTML file
├── style.css       # Styles and animations
├── script.js       # JavaScript for interactivity
└── README.md       # This file
```

## 🎨 Customization

### Colors
Edit the gradient colors in `style.css`:
```css
background: linear-gradient(135deg, #ffd89b 0%, #ffb347 30%, #ff9500 60%, #ffb347 100%);
```

### Animation Speed
Adjust animation durations in `style.css`:
```css
animation: float 4s ease-in-out infinite, morph 8s ease-in-out infinite, glow 3s ease-in-out infinite;
```

### Cursor Follow Sensitivity
Modify the easing factor in `script.js`:
```javascript
currentX += dx * 0.05;  // Lower = slower, Higher = faster
```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👤 Author

**Suraj Sanjay Shinde**
- GitHub: [@suraj991](https://github.com/suraj991)

---

Made with ❤️ and CSS animations

