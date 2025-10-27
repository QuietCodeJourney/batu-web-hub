// Login functionality
        function handleLogin(event) {
            event.preventDefault();
            
            const userRole = document.getElementById('userRole').value;
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (!userRole || !username || !password) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Show 2FA
            document.getElementById('twoFactorAuth').classList.remove('hidden');
            
            // Simulate 2FA steps
            setTimeout(() => {
                document.querySelector('.verification-step:nth-child(1)').classList.add('active');
            }, 500);
            
            setTimeout(() => {
                document.querySelector('.verification-step:nth-child(1)').classList.add('completed');
                document.querySelector('.verification-step:nth-child(2)').classList.add('active');
            }, 1500);
        }
        
        function verifyCode() {
            const code = document.getElementById('verificationCode').value;
            
            if (code.length !== 6) {
                showNotification('Please enter a 6-digit verification code', 'error');
                return;
            }
            
            // Complete verification
            document.querySelector('.verification-step:nth-child(2)').classList.add('completed');
            document.querySelector('.verification-step:nth-child(3)').classList.add('active');
            
            setTimeout(() => {
                document.querySelector('.verification-step:nth-child(3)').classList.add('completed');
                
                // Set user initials based on role
                const userRole = document.getElementById('userRole').value;
                const initials = {
                    'barangay': 'BS',
                    'lgu': 'LO',
                    'doh': 'DA',
                    'dilg': 'DG'
                };
                document.getElementById('userInitials').textContent = initials[userRole] || 'JD';
                
                // Transition to dashboard
                setTimeout(() => {
                    document.getElementById('loginScreen').classList.add('hidden');
                    document.getElementById('dashboardScreen').classList.remove('hidden');
                    showNotification('Welcome to Barangay Batu Government Hub!', 'success');
                }, 1000);
            }, 1000);
        }
        
        function logout() {
            document.getElementById('dashboardScreen').classList.add('hidden');
            document.getElementById('loginScreen').classList.remove('hidden');
            
            // Reset form
            document.getElementById('twoFactorAuth').classList.add('hidden');
            document.querySelectorAll('.verification-step').forEach(step => {
                step.classList.remove('active', 'completed');
            });
            document.getElementById('verificationCode').value = '';
            
            showNotification('Logged out successfully', 'info');
        }

        // Navigation functionality
        function showSection(sectionName) {
            // Hide all sections
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => section.classList.add('hidden'));
            
            // Show selected section
            document.getElementById(sectionName).classList.remove('hidden');
            
            // Update navigation active state
            const navButtons = document.querySelectorAll('nav button');
            navButtons.forEach(button => {
                button.classList.remove('text-white');
                button.classList.add('text-blue-200');
            });
            
            event.target.classList.remove('text-blue-200');
            event.target.classList.add('text-white');
        }

        // Notification functionality
        function toggleNotifications() {
            const panel = document.getElementById('notificationPanel');
            panel.classList.toggle('hidden');
            
            // Simulate real-time notification acknowledgment
            if (!panel.classList.contains('hidden')) {
                setTimeout(() => {
                    const badge = document.getElementById('notificationBadge');
                    badge.textContent = '0';
                    badge.classList.add('hidden');
                }, 2000);
            }
        }

        // Form submission handlers
        function handleHealthSubmit(event) {
            event.preventDefault();
            showNotification('Health report submitted successfully! Awaiting DOH verification with transparency tracking enabled.', 'success');
        }

        function handleIncidentSubmit(event) {
            event.preventDefault();
            showNotification('Incident report filed successfully! Geotagged location recorded and response team notified.', 'success');
        }

        function submitHealthReport() {
            showNotification('Health report form ready. All submissions are encrypted and tracked for transparency.', 'info');
        }

        // Notification system
        function showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `fixed top-20 right-4 glass rounded-lg p-4 z-50 slide-in max-w-sm glow`;
            
            const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
            const borderColor = type === 'success' ? 'border-emerald-500' : type === 'error' ? 'border-red-500' : 'border-blue-500';
            
            notification.innerHTML = `
                <div class="flex items-start space-x-3 border-l-4 ${borderColor} pl-3">
                    <span class="text-xl">${icon}</span>
                    <div class="flex-1">
                        <p class="text-white font-medium">${message}</p>
                    </div>
                    <button onclick="this.parentElement.parentElement.remove()" class="text-white hover:text-gray-300">✕</button>
                </div>
            `;
            
            document.body.appendChild(notification);
            
            // Auto remove after 5 seconds
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 5000);
        }

        // Offline mode simulation
        function hideOfflineBanner() {
            document.getElementById('offlineBanner').classList.add('hidden');
        }

        // Simulate offline mode occasionally
        setInterval(() => {
            if (Math.random() < 0.05) { // 5% chance every 30 seconds
                document.getElementById('offlineBanner').classList.remove('hidden');
                setTimeout(() => {
                    document.getElementById('offlineBanner').classList.add('hidden');
                }, 3000);
            }
        }, 30000);

        // Initialize counters animation
        document.addEventListener('DOMContentLoaded', function() {
            // Animate counters when dashboard loads
            setTimeout(() => {
                const counters = document.querySelectorAll('.counter');
                counters.forEach(counter => {
                    const target = parseInt(counter.textContent);
                    let current = 0;
                    const increment = target / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            counter.textContent = target + (counter.textContent.includes('%') ? '%' : '');
                            clearInterval(timer);
                        } else {
                            counter.textContent = Math.floor(current) + (counter.textContent.includes('%') ? '%' : '');
                        }
                    }, 40);
                });
            }, 1000);
        });

        // Close notification panel when clicking outside
        document.addEventListener('click', function(event) {
            const panel = document.getElementById('notificationPanel');
            const button = event.target.closest('button');
            
            if (!panel.contains(event.target) && (!button || !button.onclick || button.onclick.toString().indexOf('toggleNotifications') === -1)) {
                panel.classList.add('hidden');
            }
        });

        // Simulate real-time updates
        setInterval(() => {
            // Update notification badge occasionally
            if (Math.random() < 0.1) {
                const badge = document.getElementById('notificationBadge');
                if (badge.classList.contains('hidden')) {
                    badge.classList.remove('hidden');
                    badge.textContent = '1';
                    badge.classList.add('pulse-glow');
                }
            }
        }, 15000);

        // Add hover effects to interactive elements
        document.addEventListener('DOMContentLoaded', function() {
            const cards = document.querySelectorAll('.glass');
            cards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-2px)';
                    this.style.transition = 'transform 0.3s ease';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                });
            });
        });