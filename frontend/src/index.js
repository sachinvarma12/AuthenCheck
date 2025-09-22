// Safely query helper
function $(selector) {
    return document.querySelector(selector);
}

// Animation for the upload box
const uploadBox = $('.upload-box');

if (uploadBox) {
    uploadBox.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadBox.style.borderColor = '#0066ff';
        uploadBox.style.backgroundColor = 'rgba(0, 102, 255, 0.1)';
    });
    uploadBox.addEventListener('dragleave', () => {
        uploadBox.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        uploadBox.style.backgroundColor = 'transparent';
    });
}

// File upload functionality
const fileInput = document.getElementById('fileInput');

// Handle file selection
if (fileInput) {
    fileInput.addEventListener('change', handleFileSelect);
}

// Handle drag and drop
if (uploadBox) uploadBox.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadBox.style.borderColor = '#4A90E2';
    uploadBox.style.backgroundColor = 'rgba(74, 144, 226, 0.1)';
});

if (uploadBox) uploadBox.addEventListener('dragleave', (e) => {
    e.preventDefault();
    uploadBox.style.borderColor = 'rgba(74, 144, 226, 0.3)';
    uploadBox.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
});

if (uploadBox) uploadBox.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadBox.style.borderColor = 'rgba(74, 144, 226, 0.3)';
    uploadBox.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    
    const files = e.dataTransfer.files;
    handleFiles(files);
});

if (uploadBox) uploadBox.addEventListener('click', (e) => {
    // Only trigger file input if not clicking the button
    if (!e.target.closest('button')) {
        fileInput.click();
    }
});

function handleFileSelect(e) {
    const files = e.target.files;
    handleFiles(files);
}

function handleFiles(files) {
    if (files.length === 0) return;
    
    // Validate file types and sizes
    const validTypes = ['image/jpeg', 'image/png', 'video/mp4', 'video/quicktime', 'audio/mpeg'];
    const maxSize = 500 * 1024 * 1024; // 500MB
    
    for (let file of files) {
        if (!validTypes.includes(file.type)) {
            alert(`File ${file.name} is not a supported format. Please use MP4, MOV, JPG, PNG, or MP3 files.`);
            continue;
        }
        
        if (file.size > maxSize) {
            alert(`File ${file.name} is too large. Maximum file size is 500MB.`);
            continue;
        }
        
        // Process the file
        processFile(file);
    }
}

function processFile(file) {
    // Show file info
    const fileInfo = document.createElement('div');
    fileInfo.className = 'file-info';
    fileInfo.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px; padding: 10px; background: rgba(74, 144, 226, 0.1); border-radius: 8px; margin: 10px 0;">
            <i class="fas fa-file"></i>
            <span>${file.name}</span>
            <span style="color: var(--gray); font-size: 0.9rem;">(${(file.size / 1024 / 1024).toFixed(2)} MB)</span>
            <button onclick="this.parentElement.remove()" style="background: none; border: none; color: var(--gray); cursor: pointer; margin-left: auto;">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Insert file info after upload box
    uploadBox.insertAdjacentElement('afterend', fileInfo);
    
    // Show analyze button for files
    showAnalyzeButton();
    
    // Simulate file processing
    setTimeout(() => {
        showDemoResults();
    }, 1500);
}

function showAnalyzeButton() {
    const existingBtn = document.querySelector('.file-analyze-btn');
    if (existingBtn) return;
    
    const analyzeBtn = document.createElement('button');
    analyzeBtn.className = 'btn btn-primary file-analyze-btn';
    analyzeBtn.style.marginTop = '15px';
    analyzeBtn.innerHTML = '<i class="fas fa-search"></i> Analyze Files';
    analyzeBtn.onclick = () => showDemoResults();
    
    uploadBox.appendChild(analyzeBtn);
}

// Analysis process simulation
const analyzeBtn = document.querySelector('.url-input .btn');

if (analyzeBtn) analyzeBtn.addEventListener('click', () => {
    const urlInput = document.querySelector('.url-input input');
    if (urlInput.value.trim() === '') {
        alert('Please enter a URL to analyze');
        return;
    }
    
    // Show loading state
    analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
    analyzeBtn.disabled = true;
    
    // Simulate analysis delay
    setTimeout(() => {
        showDemoResults();
        analyzeBtn.innerHTML = 'Analyze';
        analyzeBtn.disabled = false;
    }, 2000);
});

// Demo functionality
function showDemoResults() {
    const demoResults = document.getElementById('demoResults');
    if (!demoResults) return;
    demoResults.style.display = 'block';
    demoResults.scrollIntoView({ behavior: 'smooth' });
    
    // Update demo header based on input type
    const fileInput = document.getElementById('fileInput');
    const urlInput = document.getElementById('urlInput');
    
    if (fileInput.files.length > 0) {
        document.querySelector('.demo-header h3').textContent = 'File Analysis Results';
        document.querySelector('.demo-header p').textContent = 'Analysis of your uploaded files';
    } else if (urlInput.value.trim() !== '') {
        document.querySelector('.demo-header h3').textContent = 'URL Analysis Results';
        document.querySelector('.demo-header p').textContent = 'Analysis of the provided URL';
    } else {
        document.querySelector('.demo-header h3').textContent = 'Demo Analysis Results';
        document.querySelector('.demo-header p').textContent = 'This is a demonstration of how AuthenCheck analyzes content';
    }
    
    // Animate the score counting up
    animateScore();
}

function animateScore() {
    const scoreElement = document.getElementById('demoScore');
    const targetScore = 85;
    let currentScore = 0;
    const increment = targetScore / 50; // 50 steps
    
    const timer = setInterval(() => {
        currentScore += increment;
        if (currentScore >= targetScore || !scoreElement) {
            currentScore = targetScore;
            clearInterval(timer);
        }
        if (scoreElement) scoreElement.textContent = Math.round(currentScore) + '%';
    }, 30);
}

function runNewDemo() {
    const demos = [
        {
            score: 92,
            status: 'Highly Authentic',
            description: 'This content shows strong signs of authenticity',
            image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
            details: [
                { label: 'Facial Analysis', value: '95% Authentic', class: 'score-good' },
                { label: 'Audio Quality', value: '92% Natural', class: 'score-good' },
                { label: 'Texture Analysis', value: '88% Consistent', class: 'score-good' },
                { label: 'Metadata Check', value: 'Verified', class: 'score-good' },
                { label: 'Source Verification', value: 'Trusted Publisher', class: 'score-good' }
            ]
        },
        {
            score: 45,
            status: 'Suspicious Content',
            description: 'This content shows signs of AI manipulation',
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
            details: [
                { label: 'Facial Analysis', value: '35% Authentic', class: 'score-bad' },
                { label: 'Audio Quality', value: '42% Natural', class: 'score-bad' },
                { label: 'Texture Analysis', value: '55% Consistent', class: 'score-fair' },
                { label: 'Metadata Check', value: 'Suspicious', class: 'score-bad' },
                { label: 'Source Verification', value: 'Unknown Source', class: 'score-bad' }
            ]
        },
        {
            score: 78,
            status: 'Likely Authentic',
            description: 'This content appears to be mostly authentic',
            image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
            details: [
                { label: 'Facial Analysis', value: '82% Authentic', class: 'score-good' },
                { label: 'Audio Quality', value: '75% Natural', class: 'score-fair' },
                { label: 'Texture Analysis', value: '80% Consistent', class: 'score-good' },
                { label: 'Metadata Check', value: 'Verified', class: 'score-good' },
                { label: 'Source Verification', value: 'Reliable Source', class: 'score-good' }
            ]
        }
    ];
    
    const randomDemo = demos[Math.floor(Math.random() * demos.length)];
    
    // Update demo content
    document.getElementById('demoImage').src = randomDemo.image;
    document.getElementById('demoScore').textContent = randomDemo.score + '%';
    document.getElementById('demoStatus').textContent = randomDemo.status;
    document.getElementById('demoDescription').textContent = randomDemo.description;
    
    // Update analysis details
    const detailsContainer = document.querySelector('.analysis-details');
    detailsContainer.innerHTML = '';
    
    randomDemo.details.forEach(detail => {
        const detailItem = document.createElement('div');
        detailItem.className = 'detail-item';
        detailItem.innerHTML = `
            <span>${detail.label}</span>
            <span class="${detail.class}">${detail.value}</span>
        `;
        detailsContainer.appendChild(detailItem);
    });
    
    // Animate score
    animateScore();
}

function closeDemo() {
    const demoResults = document.getElementById('demoResults');
    if (demoResults) demoResults.style.display = 'none';
}

// Feature demo functionality
function showFeatureDemo(featureType) {
    // Show loading state
    showLoadingDemo(featureType);
    
    // Simulate processing delay
    setTimeout(() => {
        const demos = {
            deepfake: {
                title: 'Deepfake Detection Demo',
                description: 'Analyzing facial features, lip sync, and micro-expressions...',
                score: 78,
                status: 'Suspicious Content Detected',
                image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
                details: [
                    { label: 'Facial Mapping', value: '65% Authentic', class: 'score-fair' },
                    { label: 'Lip Sync Analysis', value: '45% Natural', class: 'score-bad' },
                    { label: 'Micro-expressions', value: '32% Consistent', class: 'score-bad' },
                    { label: 'Eye Movement', value: '58% Natural', class: 'score-fair' },
                    { label: 'Skin Texture', value: '41% Realistic', class: 'score-bad' }
                ]
            },
            text: {
                title: 'Text Analysis Demo',
                description: 'Verifying claims against fact-checking databases...',
                score: 85,
                status: 'Likely Authentic',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
                details: [
                    { label: 'Fact Verification', value: '92% Verified', class: 'score-good' },
                    { label: 'Source Credibility', value: '88% Reliable', class: 'score-good' },
                    { label: 'Language Analysis', value: '76% Natural', class: 'score-good' },
                    { label: 'Bias Detection', value: 'Low Bias', class: 'score-good' },
                    { label: 'Cross-Reference', value: '3 Sources', class: 'score-good' }
                ]
            },
            extension: {
                title: 'Browser Extension Demo',
                description: 'Installing AuthenCheck browser extension...',
                score: 95,
                status: 'Extension Active',
                image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
                details: [
                    { label: 'Installation', value: 'Complete', class: 'score-good' },
                    { label: 'Real-time Scan', value: 'Active', class: 'score-good' },
                    { label: 'Social Media', value: 'Protected', class: 'score-good' },
                    { label: 'News Sites', value: 'Monitored', class: 'score-good' },
                    { label: 'Alerts', value: 'Enabled', class: 'score-good' }
                ]
            },
            blockchain: {
                title: 'Blockchain Verification Demo',
                description: 'Creating immutable verification record...',
                score: 100,
                status: 'Blockchain Verified',
                image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
                details: [
                    { label: 'Hash Generated', value: '0x4a8f2...', class: 'score-good' },
                    { label: 'Block Confirmed', value: '12 Blocks', class: 'score-good' },
                    { label: 'Timestamp', value: 'Verified', class: 'score-good' },
                    { label: 'Integrity Check', value: 'Passed', class: 'score-good' },
                    { label: 'Verification Count', value: '5 Nodes', class: 'score-good' }
                ]
            },
            crowd: {
                title: 'Crowd Reporting Demo',
                description: 'Community reporting system analysis...',
                score: 67,
                status: 'Under Review',
                image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
                details: [
                    { label: 'Reports Received', value: '23 Reports', class: 'score-fair' },
                    { label: 'Expert Review', value: 'In Progress', class: 'score-fair' },
                    { label: 'Community Score', value: '6.7/10', class: 'score-fair' },
                    { label: 'Verification Status', value: 'Pending', class: 'score-fair' },
                    { label: 'Trust Level', value: 'Medium', class: 'score-fair' }
                ]
            },
            realtime: {
                title: 'Real-Time Analysis Demo',
                description: 'Processing content in real-time...',
                score: 89,
                status: 'Analysis Complete',
                image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
                details: [
                    { label: 'Processing Time', value: '2.3 seconds', class: 'score-good' },
                    { label: 'AI Model', value: 'v2.1 Active', class: 'score-good' },
                    { label: 'Confidence', value: '89%', class: 'score-good' },
                    { label: 'Mobile Optimized', value: 'Yes', class: 'score-good' },
                    { label: 'Cloud Processing', value: 'Enabled', class: 'score-good' }
                ]
            }
    };
    
        const demo = demos[featureType];
        if (!demo) return;
        
        // Show demo results
        const demoResults = document.getElementById('demoResults');
        document.querySelector('.demo-header h3').textContent = demo.title;
        document.querySelector('.demo-header p').textContent = demo.description;
        
        // Update demo image
        document.getElementById('demoImage').src = demo.image;
        
        // Update demo content
        document.getElementById('demoScore').textContent = demo.score + '%';
        document.getElementById('demoStatus').textContent = demo.status;
        document.getElementById('demoDescription').textContent = demo.description;
        
        // Update analysis details
        const detailsContainer = document.querySelector('.analysis-details');
        detailsContainer.innerHTML = '';
        
        demo.details.forEach(detail => {
            const detailItem = document.createElement('div');
            detailItem.className = 'detail-item';
            detailItem.innerHTML = `
                <span>${detail.label}</span>
                <span class="${detail.class}">${detail.value}</span>
            `;
            detailsContainer.appendChild(detailItem);
        });
        
        demoResults.style.display = 'block';
        demoResults.scrollIntoView({ behavior: 'smooth' });
        
        // Animate score
        animateScore();
    }, 2000);
}

function showLoadingDemo(featureType) {
    const demoResults = document.getElementById('demoResults');
    const loadingMessages = {
        deepfake: 'Analyzing facial features and micro-expressions...',
        text: 'Verifying claims against fact-checking databases...',
        extension: 'Installing browser extension...',
        blockchain: 'Creating blockchain verification record...',
        crowd: 'Processing community reports...',
        realtime: 'Running real-time analysis...'
    };
    
    const headerTitle = document.querySelector('.demo-header h3');
    const headerDesc = document.querySelector('.demo-header p');
    if (headerTitle) headerTitle.textContent = `${loadingMessages[featureType]} Demo`;
    if (headerDesc) headerDesc.textContent = 'Please wait while we process your request...';
    
    // Show loading state
    const ds = document.getElementById('demoScore');
    const dst = document.getElementById('demoStatus');
    const dsd = document.getElementById('demoDescription');
    if (ds) ds.textContent = '...';
    if (dst) dst.textContent = 'Processing...';
    if (dsd) dsd.textContent = 'Analysis in progress...';
    
    // Show loading spinner in details
    const detailsContainer = document.querySelector('.analysis-details');
    if (!detailsContainer) return;
    detailsContainer.innerHTML = `
        <div class="detail-item">
            <span>Processing</span>
            <span><i class="fas fa-spinner fa-spin"></i> Loading...</span>
        </div>
    `;
    
    if (demoResults) {
        demoResults.style.display = 'block';
        demoResults.scrollIntoView({ behavior: 'smooth' });
    }
}

// Sample analysis functionality
function runSampleAnalysis() {
    const samples = [
        {
            score: 92,
            status: 'Highly Authentic',
            description: 'This content shows strong signs of authenticity',
            details: [
                { label: 'Facial Manipulation Detection', value: 'Low Confidence', class: 'score-good' },
                { label: 'Audio Authenticity', value: '95%', class: 'score-good' },
                { label: 'Texture Analysis', value: '91% Consistent', class: 'score-good' },
                { label: 'Source Verification', value: 'Verified Publisher', class: 'score-good' },
                { label: 'Blockchain Record', value: 'Found (5 verifications)', class: 'score-good' }
            ]
        },
        {
            score: 45,
            status: 'Suspicious Content',
            description: 'This content shows signs of AI manipulation',
            details: [
                { label: 'Facial Manipulation Detection', value: 'High Confidence', class: 'score-bad' },
                { label: 'Audio Authenticity', value: '38%', class: 'score-bad' },
                { label: 'Texture Analysis', value: '42% Consistent', class: 'score-bad' },
                { label: 'Source Verification', value: 'Unknown Source', class: 'score-bad' },
                { label: 'Blockchain Record', value: 'Not Found', class: 'score-bad' }
            ]
        },
        {
            score: 78,
            status: 'Likely Authentic',
            description: 'This content appears to be mostly authentic',
            details: [
                { label: 'Facial Manipulation Detection', value: 'Low Confidence', class: 'score-good' },
                { label: 'Audio Authenticity', value: '82%', class: 'score-good' },
                { label: 'Texture Analysis', value: '75% Consistent', class: 'score-fair' },
                { label: 'Source Verification', value: 'Reliable Source', class: 'score-good' },
                { label: 'Blockchain Record', value: 'Found (2 verifications)', class: 'score-good' }
            ]
        }
    ];
    
    const randomSample = samples[Math.floor(Math.random() * samples.length)];
    
    // Update sample results
    document.getElementById('sampleScore').textContent = randomSample.score + '%';
    document.getElementById('sampleStatus').textContent = randomSample.status;
    document.getElementById('sampleDescription').textContent = randomSample.description;
    
    // Update score circle background
    const scoreCircle = document.getElementById('sampleScoreCircle');
    const percentage = randomSample.score;
    scoreCircle.style.background = `conic-gradient(var(--success) 0% ${percentage}%, rgba(74, 144, 226, 0.2) ${percentage}% 100%)`;
    
    // Update details
    const detailsContainer = document.getElementById('sampleDetails');
    detailsContainer.innerHTML = '';
    
    randomSample.details.forEach(detail => {
        const detailItem = document.createElement('div');
        detailItem.className = 'detail-item';
        detailItem.innerHTML = `
            <span>${detail.label}</span>
            <span class="${detail.class}">${detail.value}</span>
        `;
        detailsContainer.appendChild(detailItem);
    });
    
    // Animate the score change
    animateSampleScore(randomSample.score);
}

function animateSampleScore(targetScore) {
    const scoreElement = document.getElementById('sampleScore');
    let currentScore = 0;
    const increment = targetScore / 30;
    
    const timer = setInterval(() => {
        currentScore += increment;
        if (currentScore >= targetScore) {
            currentScore = targetScore;
            clearInterval(timer);
        }
        scoreElement.textContent = Math.round(currentScore) + '%';
    }, 50);
}

function showDetailedReport() {
    alert('Detailed Report:\n\n' +
          '• Full analysis breakdown\n' +
          '• Confidence intervals\n' +
          '• Technical specifications\n' +
          '• Expert recommendations\n' +
          '• Historical comparison\n\n' +
          'This would open a comprehensive report in a real application.');
}

// Function to show all demos in sequence
function showAllDemos() {
    const features = ['deepfake', 'text', 'extension', 'blockchain', 'crowd', 'realtime'];
    let currentIndex = 0;
    
    function showNextDemo() {
        if (currentIndex < features.length) {
            showFeatureDemo(features[currentIndex]);
            currentIndex++;
            setTimeout(showNextDemo, 5000); // 5 seconds between demos
        }
    }
    
    showNextDemo();
}

// Auto-demo functionality
let autoDemoIntervalId = null;
function startAutoDemo() {
    try { localStorage.setItem('autoDemo', 'on'); } catch(_) {}
    if (autoDemoIntervalId) clearInterval(autoDemoIntervalId);
    autoDemoIntervalId = setInterval(() => {
        const features = ['deepfake', 'text', 'extension', 'blockchain', 'crowd', 'realtime'];
        const randomFeature = features[Math.floor(Math.random() * features.length)];
        showFeatureDemo(randomFeature);
    }, 10000);
}

// Provide a global stopper so UI can turn it off
window.stopAutoDemo = function stopAutoDemo(){
    if (autoDemoIntervalId) {
        clearInterval(autoDemoIntervalId);
        autoDemoIntervalId = null;
    }
}

// Initialize auto-demo on page load
window.addEventListener('load', () => {
    if (document.querySelector('.features')) {
        try {
            if (localStorage.getItem('autoDemo') === 'on') {
                startAutoDemo();
            }
        } catch(_) {}
    }
});

// Add floating animation to feature cards on scroll
const featureCards = document.querySelectorAll('.feature-card');

function checkScroll() {
    featureCards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < window.innerHeight - 100) {
            card.classList.add('floating');
        }
    });
}

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);

// Add interactive animations to buttons
const buttons = document.querySelectorAll('.btn');
if (buttons && buttons.forEach) {
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
            button.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        });
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = 'none';
        });
    });
}

// Add typewriter effect to hero text
const heroText = document.querySelector('.hero h1');
if (heroText) {
    const originalText = heroText.textContent;
    let charIndex = 0;
    function typeWriter() {
        if (charIndex < originalText.length) {
            heroText.textContent = originalText.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(typeWriter, 50);
        }
    }
    window.addEventListener('load', () => {
        heroText.textContent = '';
        setTimeout(typeWriter, 500);
    });
}