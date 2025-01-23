class WaveAnimation {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.waves = [];
        this.frameCount = 0;
        
        // Wave parameters
        this.numberOfWaves = 10;
        this.waveLength = 0.0015; // Decrease wavelength for more subtle waves
        this.baseAmplitude = 150; // Amplitude of the base wave
        this.speed = 0.005;       // Speed up the waves for a more dynamic effect
        this.lineWidth = 1;
        this.colors = [
            // Darker waves with consistent spacing in colors
            'rgba(220, 220, 220, 0.45)',
            'rgba(210, 210, 210, 0.35)',
            'rgba(200, 200, 200, 0.25)',
            'rgba(190, 190, 190, 0.25)',
            'rgba(180, 180, 180, 0.25)',
            'rgba(170, 170, 170, 0.2)',
            'rgba(160, 160, 160, 0.2)',
            'rgba(150, 150, 150, 0.2)',
            'rgba(140, 140, 140, 0.1)',
            'rgba(130, 130, 130, 0.05)'
        ];
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        // Create waves with different parameters
        for (let i = 0; i < this.numberOfWaves; i++) {
            this.waves.push({
                phase: i * Math.PI / 3,
                amplitude: this.baseAmplitude * (0.4 + Math.random() * 0.6),
                speed: this.speed * (0.7 + Math.random() * 0.6),
                wavelength: this.waveLength * (0.7 + Math.random() * 0.6), // More wavelength variation
                verticalOffset: (Math.random() - 0.5) * 300,
                curveIntensity: 0.3 + Math.random() * 0.4, // Added curve intensity variation
                color: this.colors[i]
            });
        }
        
        this.animate();
    }
    
    resize() {
        this.canvas.width = this.canvas.offsetWidth * window.devicePixelRatio;
        this.canvas.height = this.canvas.offsetHeight * window.devicePixelRatio;
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    
    drawWave(wave, index) {
        const width = this.canvas.offsetWidth;
        const height = this.canvas.offsetHeight;
        
        this.ctx.beginPath();
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.strokeStyle = wave.color;
        
        // Use more points for smoother curves
        const step = 1;
        for (let x = 0; x <= width; x += step) {
            // Add secondary wave for more curve variation
            const secondaryWave = Math.sin(x * wave.wavelength * 2 + this.frameCount * wave.speed * 0.5) * 
                                wave.amplitude * 0.3 * wave.curveIntensity;
                                
            const y = height / 2 + 
                     wave.verticalOffset +
                     Math.sin(x * wave.wavelength + this.frameCount * wave.speed + wave.phase) * 
                     wave.amplitude * 
                     (1 + Math.sin(this.frameCount * 0.02 + index) * 0.15) +
                     secondaryWave; // Add secondary wave to primary wave
            
            if (x === 0) {
                this.ctx.moveTo(x, y);
            } else {
                // Use quadratic curves instead of lines for smoother appearance
                const prevX = x - step;
                const prevY = height / 2 + 
                             wave.verticalOffset +
                             Math.sin(prevX * wave.wavelength + this.frameCount * wave.speed + wave.phase) * 
                             wave.amplitude * 
                             (1 + Math.sin(this.frameCount * 0.02 + index) * 0.15) +
                             Math.sin(prevX * wave.wavelength * 2 + this.frameCount * wave.speed * 0.5) * 
                             wave.amplitude * 0.3 * wave.curveIntensity;
                             
                const cpX = x - step / 2;
                const cpY = (y + prevY) / 2;
                
                this.ctx.quadraticCurveTo(cpX, cpY, x, y);
            }
        }
        
        this.ctx.stroke();
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw each wave
        this.waves.forEach((wave, index) => this.drawWave(wave, index));
        
        this.frameCount++;
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize the wave animation when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('waveCanvas');
    if (canvas) {
        new WaveAnimation(canvas);
    }
});
