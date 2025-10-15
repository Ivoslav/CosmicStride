
# 🚀 CosmicStride

> *Every step on Earth is a journey to space*

**CosmicStride** transforms your running and walking activities into cosmic adventures. Track your routes on Earth and visualize them as journeys through space, where every meter you run equals one kilometer toward the stars.

<!-- ![CosmicStride Banner](???) -->

---

## 🌟 Concept

CosmicStride bridges the gap between sports and space exploration by:

- **Gamifying fitness**: Run 5km on Earth = Reach the stratosphere (50km) in space
- **Visualizing achievements**: See your route from orbit with stunning 3D Earth visualization
- **Educational AR**: Walk and explore space in real-time through your phone
- **Space data integration**: Track cosmic conditions (UV, solar activity, ISS position) during your activities

Built for the **CASSINI Hackathon 2025** - EU Space for Consumer Experience

---

## ✨ Key Features

### 🏃‍♂️ Post-Run Orbital Replay
After completing your run:
- **3D visualization** of your route on Earth
- **Epic zoom-out animation** from ground level to orbital view
- **Space journey calculation**: Your 10km run = 10,000km toward space!
- Track which cosmic milestone you've reached

### 🎯 Space Milestones
- **5 km** → Stratosphere (50 km altitude)
- **10 km** → Commercial flight altitude
- **100 km** → Kármán line (edge of space)
- **400 km** → International Space Station
- **35,786 km** → Geostationary orbit
- **384,400 km** → The Moon
- **Continue to Mars, Jupiter, and beyond!**

### 🚶 AR Walk & Discover Mode
While walking through your city:
- Point your camera at the sky
- See **real-time ISS position** overhead
- Discover cosmic facts and educational content
- Collect "cosmic points" through AR interactions
- "The ISS is passing overhead in 2 minutes!"

### 🌞 Cosmic Conditions Tracking
After each activity, review:
- UV radiation levels during your run
- Solar wind speed
- Geomagnetic activity (Kp index)
- Atmospheric pressure
- *"Today's solar wind: 450 km/s — added extra energy to your run! ⚡"*

---

## 🛠️ Tech Stack

### Frontend
- **React + Next.js** - Modern web framework
- **Three.js** - 3D graphics and animations
- **CesiumJS** - Orbital Earth visualization
- **AR.js / 8th Wall** - WebAR for Walk mode
- **Tailwind CSS** - Styling

### APIs & Data
- **NASA APIs** - ISS position, solar activity (DONKI)
- **OpenWeather / OpenUV** - UV index and weather data
- **Web GPS API** - Route tracking
- **Copernicus Sentinel** - Satellite imagery (optional)

### Deployment
- **Vercel** - Frontend hosting
- **GitHub Actions** - CI/CD

---

## 🚀 Quick Start

### Prerequisites
```bash
node >= 18.0.0
npm >= 9.0.0
```

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/cosmicstride.git
cd cosmicstride

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your API keys (NASA, OpenWeather, etc.)

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📱 Demo Scenarios

### Scenario 1: Marathon Runner
1. User completes a 10km run (GPS tracked or uploaded GPX file)
2. Opens app → "View from Space" button
3. Watches epic zoom-out animation
4. Sees achievement: "You've reached the thermosphere! 🌡️"
5. Milestone progress: "Next goal: Kármán line (100km) - 90km to go!"

### Scenario 2: Casual Walker
1. User activates "AR Walk" mode
2. Points phone at sky while walking in park
3. Sees ISS trajectory overlay
4. Gets notification: "ISS visible in 5 minutes!"
5. Collects cosmic fact: "The ISS travels at 28,000 km/h"

---

## 🎨 Design Philosophy

- **Minimalist UI** - Focus on the cosmic journey, not cluttered interface
- **Smooth animations** - Cinematic transitions between Earth and space views
- **Dark theme** - Space-inspired color palette
- **Mobile-first** - Optimized for phone usage
- **Accessibility** - WCAG 2.1 AA compliant

---

## 🗺️ Roadmap

### Phase 1: MVP (Hackathon Demo) ✅
- [x] Basic 3D Earth visualization
- [x] Route replay with zoom-out animation
- [x] Space milestone calculation
- [x] Simple AR sky view

### Phase 2: Post-Hackathon (2 weeks)
- [ ] Real GPS tracking integration
- [ ] User authentication & profiles
- [ ] Route history & statistics
- [ ] Social sharing features
- [ ] Enhanced AR with 3D planet models
- [ ] Real-time ISS tracking with notifications
- [ ] Multiplayer challenges ("Race to Mars")

### Phase 3: Future Vision
- [ ] Smartwatch integration
- [ ] AI-powered training recommendations based on space weather
- [ ] VR mode for immersive orbital view
- [ ] Integration with Strava, Garmin, etc.
- [ ] Augmented reality route previews

---

## 🏆 CASSINI Hackathon 2025

**Challenge:** EU Space for Consumer Experience

**How CosmicStride addresses the challenge:**
- ✅ Makes space data accessible and fun for everyday users
- ✅ Combines EU space assets (Copernicus, Galileo potential) with consumer fitness
- ✅ Educational value: raises awareness about space technology
- ✅ Gamification: motivates healthy lifestyle through cosmic exploration
- ✅ Innovative AR experience: brings space tourism to your neighborhood

---

## 📊 Project Structure

```
cosmicstride/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   │   ├── Earth3D/     # 3D Earth visualization
│   │   ├── ARView/      # AR camera view
│   │   ├── RouteReplay/ # Post-run animation
│   │   └── Milestones/  # Achievement system
│   ├── lib/             # Utilities & API clients
│   │   ├── nasa.ts      # NASA API integration
│   │   ├── gps.ts       # GPS tracking
│   │   └── calculations.ts # Distance/milestone logic
│   └── styles/          # Global styles
├── public/              # Static assets
└── docs/               # Documentation
```

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

---

## 👥 Team

- **[Petkoff]** - Full Stack Developer
- Built during CASSINI Hackathon Bulgaria 2025

---

## 🙏 Acknowledgments

- **CASSINI Initiative** for organizing the hackathon
- **NASA** for open APIs and space data
- **European Space Agency (ESA)** for Copernicus program
- **CesiumJS** team for amazing 3D globe library
- All the runners and space enthusiasts who inspired this project

---

## 📞 Contact

- **Demo**: [cosmicstride.vercel.app](https://cosmicstride.vercel.app) *(coming soon)*
- **Email**: ivoslavpetkov@gmail.com
- **Twitter**: [@???](https://twitter.com/cosmicstride)

---

<div align="center">

**🌍 Run on Earth. Reach for the Stars. 🚀**

Made with ❤️ and ☕ for CASSINI Hackathon 2025

[Report Bug](https://github.com/yourusername/cosmicstride/issues) · [Request Feature](https://github.com/yourusername/cosmicstride/issues) · [Documentation](https://github.com/yourusername/cosmicstride/wiki)

</div>