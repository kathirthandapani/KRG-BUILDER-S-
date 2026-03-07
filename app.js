window.App = {
    _initialized: false,
    API_BASE_URL: (function () {
        if (window.location.protocol === 'file:') return 'http://localhost:3000';
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') return '';
        // If we are on a subpath (like GitHub Pages), we might need to point to a real backend.
        // For now, default to relative, but provide a way to detect if we're on a known static host.
        return '';
    })(),
    // Views
    views: {
        home: `
            <header class="relative w-full h-[70vh] sm:h-[80vh] md:h-[600px] flex items-end justify-center overflow-hidden pb-20">
                <div class="absolute inset-0 z-0">
                    <img alt="KRG Building Materials" class="w-full h-full object-cover" src="assets/hero-bg.png"/>
                    <div class="absolute inset-0 bg-black/10"></div>
                </div>
                
                <div class="relative z-10 w-full max-w-7xl mx-auto px-6 text-center">
                    <div class="mb-4 inline-flex items-center gap-1 px-3 py-1 rounded bg-black/50 backdrop-blur border border-primary/50 text-primary text-[10px] md:text-xs font-bold uppercase tracking-wider mx-auto">
                        <span class="material-icons-round text-sm">engineering</span>
                        Since 2010
                    </div>
                    <h1 class="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-4 leading-[1.1] uppercase tracking-wide drop-shadow-lg">
                        Foundation <br/>
                        <span class="text-primary">For Your</span> <br/>
                        Future
                    </h1>
                    <p class="text-gray-200 mb-8 max-w-lg mx-auto text-sm md:text-base font-medium drop-shadow-md">
                        Premium building materials and professional earth moving services in Dindigul. We build trust with every load.
                    </p>
                    
                    <!-- CTA Buttons -->
                    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a href="#/catalog" class="group px-8 py-4 bg-white text-black font-bold rounded-xl shadow-2xl hover:bg-primary transition-all flex items-center gap-3 active:scale-95">
                            EXPLORE CATALOG
                            <span class="material-icons-round group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </a>
                        <a href="tel:9944748140" class="px-8 py-4 bg-black/40 backdrop-blur-md text-white border-2 border-white/20 font-bold rounded-xl hover:bg-white/10 transition-all flex items-center gap-3">
                             <span class="material-icons-round">phone</span>
                             CALL NOW
                        </a>
                    </div>
                </div>
            </header>

            <section class="max-w-7xl mx-auto px-6 py-16">
                <div class="flex items-center justify-between mb-10">
                    <h2 class="font-display font-bold text-4xl uppercase text-gray-900 dark:text-white">
                        Core <span class="text-primary">Materials</span>
                    </h2>
                    <span class="material-icons-round text-gray-400 text-4xl">category</span>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div class="group bg-white dark:bg-surface-dark p-6 rounded-xl shadow-sm hover:shadow-xl transition-all border-l-4 border-primary">
                        <div class="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                            <span class="material-icons-round text-gray-600 dark:text-gray-300 group-hover:text-black">landscape</span>
                        </div>
                        <h3 class="font-display font-bold text-xl dark:text-white mb-2">M-Sand & River Sand</h3>
                        <p class="text-sm text-gray-500 dark:text-gray-400">High quality sifting for strong foundations and finishing works.</p>
                    </div>
                    <div class="group bg-white dark:bg-surface-dark p-6 rounded-xl shadow-sm hover:shadow-xl transition-all border-l-4 border-gray-300 dark:border-gray-600">
                        <div class="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                            <span class="material-icons-round text-gray-600 dark:text-gray-300 group-hover:text-black">grid_view</span>
                        </div>
                        <h3 class="font-display font-bold text-xl dark:text-white mb-2">Red Bricks</h3>
                        <p class="text-sm text-gray-500 dark:text-gray-400">Standard and chamber bricks available for all construction needs.</p>
                    </div>
                    <div class="group bg-white dark:bg-surface-dark p-6 rounded-xl shadow-sm hover:shadow-xl transition-all border-l-4 border-gray-300 dark:border-gray-600">
                        <div class="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                            <span class="material-icons-round text-gray-600 dark:text-gray-300 group-hover:text-black">foundation</span>
                        </div>
                        <h3 class="font-display font-bold text-xl dark:text-white mb-2">Cement</h3>
                        <p class="text-sm text-gray-500 dark:text-gray-400">Top brands wholesale & retail. Quality guaranteed for durability.</p>
                    </div>
                    <div class="group bg-white dark:bg-surface-dark p-6 rounded-xl shadow-sm hover:shadow-xl transition-all border-l-4 border-gray-300 dark:border-gray-600">
                        <div class="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                            <span class="material-icons-round text-gray-600 dark:text-gray-300 group-hover:text-black">terrain</span>
                        </div>
                        <h3 class="font-display font-bold text-xl dark:text-white mb-2">Blue Metal</h3>
                        <p class="text-sm text-gray-500 dark:text-gray-400">Gravel & crushed stone aggregates in various sizes (6mm-40mm).</p>
                    </div>
                </div>
            </section>
        `,

        catalog: `
            <header class="px-6 pt-8 pb-4 max-w-7xl mx-auto">
                <div class="flex justify-between items-center mb-6">
                    <div>
                        <p class="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase">Santhaipettai, Dindigul</p>
                        <h1 class="text-3xl font-bold text-primary flex items-center gap-2 font-display">
                            <span class="material-icons-round">roofing</span> PRODUCT CATALOG
                        </h1>
                    </div>
                    <div class="flex items-center gap-2">
                        <button id="add-product-btn" onclick="App.showAddProductModal()" class="hidden px-4 py-2 bg-primary text-black text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2">
                             <span class="material-icons-round text-sm">add</span> 
                             Add Product
                        </button>
                    </div>
                </div>
                <div class="relative group max-w-2xl">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span class="material-icons-round text-gray-400">search</span>
                    </div>
                    <input class="block w-full pl-10 pr-3 py-4 border-none rounded-2xl leading-5 bg-white dark:bg-surface-dark text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm transition-all" placeholder="Search sand, bricks, or trucks..." type="text"/>
                </div>
            </header>

            <nav class="mb-10 max-w-7xl mx-auto px-6">
                <ul class="flex overflow-x-auto space-x-4 pb-2 no-scrollbar">
                    <li><button class="px-6 py-3 bg-primary text-black rounded-xl text-sm font-bold shadow-lg shadow-primary/20">All</button></li>
                    <li><button class="px-6 py-3 bg-white dark:bg-surface-dark text-gray-600 dark:text-gray-300 rounded-xl text-sm font-semibold border border-gray-100 dark:border-gray-700 whitespace-nowrap">River Sand</button></li>
                    <li><button class="px-6 py-3 bg-white dark:bg-surface-dark text-gray-600 dark:text-gray-300 rounded-xl text-sm font-semibold border border-gray-100 dark:border-gray-700 whitespace-nowrap">Aggregates</button></li>
                    <li><button class="px-6 py-3 bg-white dark:bg-surface-dark text-gray-600 dark:text-gray-300 rounded-xl text-sm font-semibold border border-gray-100 dark:border-gray-700 whitespace-nowrap">Cement</button></li>
                </ul>
            </nav>

            <section class="px-4 md:px-6 max-w-7xl mx-auto pb-20">
                <div id="catalog-grid" class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                    <!-- Dynamic Content Loading... -->
                </div>
            </section>
        `,

        dashboard: `
            <div class="max-w-7xl mx-auto px-6 py-8">
                <div class="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 class="text-3xl font-bold text-gray-900 dark:text-white font-display">CLIENT DASHBOARD</h2>
                        <p class="text-gray-500 dark:text-gray-400">Welcome back, K.R. Gandhi. Track your site progress and orders.</p>
                    </div>
                    <div class="flex items-center gap-3">
                        <img alt="User" class="w-12 h-12 rounded-full border-2 border-primary object-cover" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop"/>
                        <div>
                            <p class="text-sm font-bold">K.R. Gandhi</p>
                            <span class="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold uppercase">Prime Client</span>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <!-- Site Activity Card -->
                    <div class="lg:col-span-2 bg-white dark:bg-surface-dark rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div class="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
                            <h4 class="font-bold flex items-center gap-2">
                                <span class="material-icons-round text-primary">engineering</span>
                                NAGAL NAGAR EXCAVATION
                            </h4>
                            <span class="px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full uppercase tracking-wider">In Progress</span>
                        </div>
                        <div class="p-8">
                            <div class="mb-6 flex justify-between items-end">
                                <div>
                                    <p class="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">Overall Progress</p>
                                    <p class="text-gray-500 text-sm">Site Site 3 - Dindigul Central</p>
                                </div>
                                <span class="text-5xl font-display font-bold text-primary">72%</span>
                            </div>
                            <div class="relative w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
                                <div class="absolute top-0 left-0 h-full bg-primary rounded-full" style="width: 72%"></div>
                                <div class="absolute top-0 left-0 h-full w-full opacity-10 animate-pulse" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, #000 10px, #000 20px);"></div>
                            </div>
                            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
                                <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                                    <p class="text-[10px] text-gray-400 font-bold uppercase">Log Hours</p>
                                    <p class="text-xl font-bold">124 hrs</p>
                                </div>
                                <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                                    <p class="text-[10px] text-gray-400 font-bold uppercase">Est. Completion</p>
                                    <p class="text-xl font-bold">2 Days</p>
                                </div>
                                <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                                    <p class="text-[10px] text-gray-400 font-bold uppercase">Machines</p>
                                    <p class="text-xl font-bold">2 JCBs</p>
                                </div>
                                <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                                    <p class="text-[10px] text-gray-400 font-bold uppercase">Team Size</p>
                                    <p class="text-xl font-bold">8 People</p>
                                </div>
                        </div>
                    </div>

                    <!-- Side Actions / Recent Orders -->
                    <div class="space-y-8">
                        <section class="bg-white dark:bg-surface-dark rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6">
                            <h4 class="font-bold mb-6 flex items-center gap-2">
                                <span class="material-icons-round text-primary">history</span>
                                RECENT ORDERS
                            </h4>
                            <div class="space-y-4">
                                <div class="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
                                    <div class="flex items-center gap-3">
                                        <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary italic font-bold">S</div>
                                        <div>
                                            <p class="text-sm font-bold">River Sand</p>
                                            <p class="text-[10px] text-gray-400">2 Units Delivered</p>
                                        </div>
                                    </div>
                                    <span class="text-sm font-bold font-display">₹12,000</span>
                                </div>
                                <div class="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
                                    <div class="flex items-center gap-3">
                                        <div class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 italic font-bold">B</div>
                                        <div>
                                            <p class="text-sm font-bold">Red Bricks</p>
                                            <p class="text-[10px] text-orange-500 font-bold">In Transit</p>
                                        </div>
                                    </div>
                                    <span class="text-sm font-bold font-display">₹24,500</span>
                                </div>
                            </div>
                            <button class="w-full mt-6 py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">View All Orders</button>
                        </section>

                        <section class="bg-primary p-6 rounded-2xl shadow-xl shadow-primary/20">
                            <h4 class="text-black font-display font-bold text-xl mb-2">NEED SUPPORT?</h4>
                            <p class="text-black/70 text-sm mb-6">Connect with our proprietors directly for any site emergencies.</p>
                            <div class="flex flex-col gap-2">
                                <a href="tel:9944748140" class="w-full py-3 bg-black/20 text-black font-bold rounded-xl text-xs flex items-center justify-center gap-2 hover:bg-black/30 transition-all">
                                    <span class="material-icons-round text-sm">person</span> Call K.R. Gandhi
                                </a>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        `,

        "today-rates": `
            <div class="max-w-4xl mx-auto px-6 py-12">
                <div class="flex justify-between items-end mb-8">
                    <div>
                        <h2 class="text-3xl font-bold text-gray-900 dark:text-white font-display">TODAY'S RATES</h2>
                        <p class="text-gray-500 dark:text-gray-400">Live market rates for Dindigul region. Last updated: <span id="last-updated-date">Today</span>.</p>
                    </div>
                    <button id="update-rates-btn" onclick="App.saveRates()" class="hidden bg-primary hover:bg-orange-600 text-black font-bold py-3 px-6 rounded-xl shadow-lg shadow-orange-500/20 flex items-center gap-2 transition-transform active:scale-95">
                        <span class="material-icons-round">save</span>
                        Update Rates
                    </button>
                </div>
                
                <div class="bg-white dark:bg-surface-dark rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <div class="overflow-x-auto overflow-y-hidden">
                        <table class="w-full text-left min-w-[320px]">
                            <thead class="sticky top-0 z-10 bg-gray-50 dark:bg-gray-800 text-gray-400 uppercase text-[10px] md:text-xs font-bold tracking-wider">
                                <tr>
                                    <th class="px-4 md:px-6 py-4">Material</th>
                                    <th class="px-3 md:px-6 py-4">Unit</th>
                                    <th class="px-4 md:px-6 py-4 text-right">Price (₹)</th>
                                </tr>
                            </thead>
                            <tbody id="rates-table-body" class="divide-y divide-gray-100 dark:divide-gray-700">
                                <!-- Dynamic Rows Here -->
                            </tbody>
                        </table>
                    </div>
                </div>
                <p class="mt-6 text-sm text-gray-400 text-center italic">* Rates are subject to change based on market availability and transport distance.</p>
            </div>
        `,

        orders: `
            <div class="max-w-3xl mx-auto px-6 py-12">
                <div class="mb-10">
                    <a href="#/dashboard" class="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mb-4 text-sm font-bold uppercase tracking-widest">
                        <span class="material-icons-round text-sm">arrow_back</span> Back to Dashboard
                    </a>
                    <h2 class="text-3xl font-bold text-gray-900 dark:text-white font-display uppercase">Track My Orders</h2>
                    <p class="text-gray-500 dark:text-gray-400">Track the real-time status of your material orders.</p>
                </div>

                <div id="user-orders-list" class="space-y-6">
                    <!-- Dynamic User Orders -->
                     <p class="text-center py-20 text-gray-500">Loading your history...</p>
                </div>
            </div>
        `,

        login: `
            <div class="max-w-md mx-auto px-6 py-20">
                <div class="bg-white dark:bg-surface-dark p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                    <h2 class="text-3xl font-bold text-center mb-8 font-display text-gray-900 dark:text-white">LOGIN</h2>
                    <form onsubmit="App.login(event)" class="space-y-6">
                        <div>
                            <label class="block text-sm font-bold text-gray-500 mb-2">Username or Phone</label>
                            <input type="text" name="username" required class="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-none focus:ring-2 focus:ring-primary">
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-gray-500 mb-2">Password</label>
                            <input type="password" name="password" required class="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-none focus:ring-2 focus:ring-primary">
                        </div>
                        <button type="submit" class="w-full py-4 bg-primary text-black font-bold rounded-xl hover:bg-orange-600 transition shadow-lg shadow-orange-500/20">
                            SIGN IN
                        </button>
                    </form>
                    <p class="mt-6 text-center text-sm text-gray-500">Don't have an account? <a href="#/register" class="text-primary font-bold hover:underline">Register</a></p>
                    <div class="mt-10 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col items-center gap-4 opacity-40">
                        <p class="text-[10px] font-bold uppercase tracking-widest text-gray-400">Compatible with all your devices</p>
                        <div class="flex gap-8">
                            <span class="material-icons-round text-2xl">smartphone</span>
                            <span class="material-icons-round text-2xl">laptop</span>
                            <span class="material-icons-round text-2xl">desktop_windows</span>
                        </div>
                    </div>
                </div>
            </div>
        `,

        register: `
            <div class="max-w-md mx-auto px-6 py-20">
                <div class="bg-white dark:bg-surface-dark p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                    <h2 class="text-3xl font-bold text-center mb-8 font-display text-gray-900 dark:text-white">REGISTER</h2>
                    <form onsubmit="App.register(event)" class="space-y-6">
                        <div>
                            <label class="block text-sm font-bold text-gray-500 mb-2">Username</label>
                            <input type="text" name="username" required class="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-none focus:ring-2 focus:ring-primary">
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-gray-500 mb-2">Phone Number</label>
                            <input type="tel" name="phone" required pattern="[0-9]{10}" maxlength="10" 
                                   class="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-none focus:ring-2 focus:ring-primary" 
                                   placeholder="10-digit mobile number" title="Please enter exactly 10 digits" 
                                   oninput="this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10)">
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-gray-500 mb-2">Password</label>
                            <input type="password" name="password" required class="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-none focus:ring-2 focus:ring-primary">
                        </div>
                        <button type="submit" class="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition">
                            CREATE ACCOUNT
                        </button>
                    </form>
                    <p class="mt-6 text-center text-sm text-gray-500">Already have an account? <a href="#/login" class="text-primary font-bold hover:underline">Login</a></p>
                </div>
            </div>
        `,

        history: `
            <div class="max-w-6xl mx-auto px-6 py-12">
                <div class="flex justify-between items-center mb-8">
                    <h2 class="text-3xl font-bold text-gray-900 dark:text-white font-display">ORDER HISTORY</h2>
                    <button onclick="App.loadHistory()" class="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 transition">
                         <span class="material-icons-round text-sm">refresh</span>
                    </button>
                </div>
                <div class="bg-white dark:bg-surface-dark rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <div class="overflow-x-auto overflow-y-hidden">
                        <table class="w-full text-left min-w-[600px]">
                            <thead class="bg-gray-50 dark:bg-gray-800/50 text-gray-400 uppercase text-[10px] font-bold tracking-wider">
                                <tr>
                                    <th class="px-4 md:px-6 py-4">Date & Time</th>
                                    <th class="px-4 md:px-6 py-4">Product Name</th>
                                    <th class="px-4 md:px-6 py-4">Price</th>
                                    <th class="px-4 md:px-6 py-4">Phone Number</th>
                                    <th class="px-4 md:px-6 py-4">Place Details</th>
                                </tr>
                            </thead>
                            <tbody id="history-table-body" class="divide-y divide-gray-100 dark:divide-gray-700">
                                <!-- Dynamic Content -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `,
        users: `
            <div class="max-w-6xl mx-auto px-6 py-12">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div class="bg-white dark:bg-surface-dark p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                        <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Total Users</p>
                        <h3 id="stat-total-users" class="text-4xl font-display font-bold text-primary">--</h3>
                    </div>
                    <div class="bg-white dark:bg-surface-dark p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                        <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Total Orders</p>
                        <h3 id="stat-total-orders" class="text-4xl font-display font-bold text-white">--</h3>
                    </div>
                    <div class="bg-white dark:bg-surface-dark p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 flex items-center justify-between">
                        <button onclick="App.showAddUserModal()" class="w-full bg-primary hover:bg-orange-600 text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2">
                            <span class="material-icons-round">person_add</span>
                            ADD USER
                        </button>
                    </div>
                </div>

                <div class="bg-white dark:bg-surface-dark rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <div class="p-6 border-b border-gray-100 dark:border-gray-700">
                        <h2 class="text-xl font-bold font-display">USER MANAGEMENT</h2>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full text-left">
                            <thead class="bg-gray-50 dark:bg-gray-800/50 text-gray-400 uppercase text-[10px] font-bold tracking-wider">
                                <tr>
                                    <th class="px-6 py-4">ID</th>
                                    <th class="px-6 py-4">Username</th>
                                    <th class="px-6 py-4">Phone</th>
                                    <th class="px-6 py-4">Role</th>
                                    <th class="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody id="users-table-body" class="divide-y divide-gray-100 dark:divide-gray-700">
                                <!-- Dynamic Users -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `
    },

    // Data Store
    currentUser: null,
    rates: [],
    historyLog: [],

    // Initialization and Routing Logic
    init() {
        if (this._initialized) return;
        this._initialized = true;
        this.setupTheme();
        this.checkAuth();
        this.loadRates();
        this.loadProducts();
        this.setupMobileMenu();
        this.render();
        this.updateStatus();
        setInterval(() => this.updateStatus(), 10000); // Check every 10s
        window.addEventListener('hashchange', () => {
            this.render();
            this.closeMobileMenu();
        });
    },

    async updateStatus() {
        const indicator = document.getElementById('api-status');
        if (!indicator) return;
        try {
            const res = await fetch(`${this.API_BASE_URL}/api/rates`);
            if (res.ok) {
                indicator.className = "flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-[10px] font-bold text-green-600 dark:text-green-400 transition-all duration-500";
                indicator.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> ONLINE';
            } else {
                throw new Error();
            }
        } catch (e) {
            indicator.className = "flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-[10px] font-bold text-red-600 dark:text-red-400 transition-all duration-500";
            indicator.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span> OFFLINE';
        }
    },

    render() {
        const hash = window.location.hash || '#/home';
        const viewName = hash.replace('#/', '') || 'home';
        let content = this.views[viewName] || this.views.home;
        let viewId = (this.views[viewName] ? viewName : 'home') + '-view';

        const container = document.getElementById(viewId);
        if (container) {
            // Remove active from all
            document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));

            // Inject content if empty or has Loading/Initializing placeholder
            if (container.innerHTML.includes('Loading') || container.innerHTML.includes('Initializing') || !container.innerHTML.trim()) {
                container.innerHTML = content;
            }

            container.classList.add('active');
            window.scrollTo(0, 0);
        }

        // Update nav links (both desktop and mobile)
        document.querySelectorAll('.nav-link').forEach(link => {
            const linkHash = link.getAttribute('href');
            if (linkHash === hash) {
                link.classList.add('text-primary');
                link.classList.remove('text-gray-400');
            } else {
                link.classList.remove('text-primary');
                link.classList.add('text-gray-400');
            }
        });

        this.setupEventListeners();

        if (viewName === 'today-rates') {
            this.renderRatesTable();
        } else if (viewName === 'catalog') {
            this.renderCatalog(this.products);
            this.setupCatalogFilters();
        } else if (viewName === 'history') {
            this.loadHistory();
        } else if (viewName === 'orders') {
            this.loadUserOrders();
        } else if (viewName === 'users') {
            this.loadStats();
            this.loadAdminUsers();
        }

        this.updateAuthUI();
    },

    checkAuth() {
        const user = localStorage.getItem('krg_user');
        if (user) {
            this.currentUser = JSON.parse(user);
        }
    },

    updateAuthUI() {
        const loginLink = document.getElementById('nav-login');
        const registerLink = document.getElementById('nav-register');
        const logoutLink = document.getElementById('nav-logout');
        const adminHistoryLink = document.getElementById('nav-history');
        const adminUsersLink = document.getElementById('nav-users');
        const adminUsersMobileLink = document.getElementById('nav-users-mobile');
        const addProductBtn = document.getElementById('add-product-btn');
        const updateRatesBtn = document.getElementById('update-rates-btn');
        const navSync = document.getElementById('nav-sync');

        // Drawer elements
        const drawerLogin = document.getElementById('drawer-login');
        const drawerRegister = document.getElementById('drawer-register');
        const drawerLogout = document.getElementById('drawer-logout');

        // Mobile bottom nav elements
        const navLoginMobile = document.getElementById('nav-login-mobile');

        const isAdmin = this.currentUser && this.currentUser.role === 'admin';

        if (this.currentUser) {
            if (loginLink) loginLink.classList.add('hidden');
            if (registerLink) registerLink.classList.add('hidden');
            if (logoutLink) {
                logoutLink.classList.remove('hidden');
                logoutLink.textContent = `Logout (${this.currentUser.username})`;
            }
            if (drawerLogin) drawerLogin.classList.add('hidden');
            if (drawerRegister) drawerRegister.classList.add('hidden');
            if (drawerLogout) {
                drawerLogout.classList.remove('hidden');
                drawerLogout.querySelector('span:last-child').textContent = `Logout (${this.currentUser.username})`;
            }
            if (navLoginMobile) {
                navLoginMobile.href = "#/history"; // Link to history for logged in users
                navLoginMobile.querySelector('span:last-child').textContent = "Activity";
                navLoginMobile.querySelector('.material-icons-round').textContent = "history";
            }

            if (adminHistoryLink) adminHistoryLink.classList.toggle('hidden', !isAdmin);
            if (adminUsersLink) adminUsersLink.classList.toggle('hidden', !isAdmin);
            if (adminUsersMobileLink) adminUsersMobileLink.classList.toggle('hidden', !isAdmin);
        } else {
            if (loginLink) loginLink.classList.remove('hidden');
            if (registerLink) registerLink.classList.remove('hidden');
            if (logoutLink) logoutLink.classList.add('hidden');

            if (drawerLogin) drawerLogin.classList.remove('hidden');
            if (drawerRegister) drawerRegister.classList.remove('hidden');
            if (drawerLogout) drawerLogout.classList.add('hidden');

            if (navLoginMobile) {
                navLoginMobile.href = "#/login";
                navLoginMobile.querySelector('span:last-child').textContent = "Login";
                navLoginMobile.querySelector('.material-icons-round').textContent = "person";
            }

            if (adminHistoryLink) adminHistoryLink.classList.add('hidden');
            if (adminUsersLink) adminUsersLink.classList.add('hidden');
            if (adminUsersMobileLink) adminUsersMobileLink.classList.add('hidden');
        }

        // View-specific buttons
        if (addProductBtn) addProductBtn.classList.toggle('hidden', !isAdmin);
        if (updateRatesBtn) updateRatesBtn.classList.toggle('hidden', !isAdmin);
        if (navSync) navSync.classList.toggle('hidden', !isAdmin);
    },

    async login(e) {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;

        try {
            const res = await fetch(`${this.API_BASE_URL}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (res.ok) {
                this.currentUser = { username: data.username, phone: data.phone, role: data.role, token: data.token };
                localStorage.setItem('krg_user', JSON.stringify(this.currentUser));
                alert("Login Successful!");
                window.location.hash = '#/home';
                this.init(); // Reload
            } else {
                alert(data.error);
            }
        } catch (err) {
            console.error(err);
            const host = window.location.host;
            alert(`Connection Failed!\n\nTarget: ${this.API_BASE_URL || window.location.origin}/api/login\n\nTips for Mobile/Laptop users:\n1. If on phone, ensure you are using the laptop IP (e.g. http://${host.includes('localhost') ? '192.168.1.X' : host})\n2. Ensure the server.js is running and 0.0.0.0 is used.\n3. Check if your Firewall allows Port 3000.`);
        }
    },

    async register(e) {
        e.preventDefault();
        const username = e.target.username.value;
        const phone = e.target.phone.value;
        const password = e.target.password.value;

        if (!/^[0-9]{10}$/.test(phone)) {
            alert("Error: Phone number must be exactly 10 digits.");
            return;
        }

        try {
            const res = await fetch(`${this.API_BASE_URL}/api/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, phone })
            });
            const data = await res.json();
            if (res.ok) {
                alert("Registration Successful! Please Login.");
                window.location.hash = '#/login';
            } else {
                alert(data.error);
            }
        } catch (err) {
            alert(`Registration Connection Failed!\n\nTarget: ${this.API_BASE_URL || window.location.origin}/api/register\n\nPlease ensure your device is on the same Wi-Fi and the server is running.`);
        }
    },

    logout() {
        this.currentUser = null;
        localStorage.removeItem('krg_user');
        window.location.hash = '#/login';
        this.init();
    },

    setupEventListeners() {
        // Support and Call Buttons
        document.querySelectorAll('button, a').forEach(el => {
            const text = el.textContent.toLowerCase();
            // Only attach if it's explicitly a call button and doesn't already have an href="tel:"
            if ((text.includes('call now') || text.includes('contact support')) && !el.getAttribute('href')?.startsWith('tel:')) {
                el.onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.location.href = `tel:9944748140`;
                };
            }
        });

        // Dashboard specific interactions
        if (window.location.hash.includes('dashboard')) {
            const viewOrdersBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('View All Orders'));
            if (viewOrdersBtn) {
                viewOrdersBtn.onclick = () => window.location.hash = '#/orders';
            }
        }
    },

    // Rates Management
    async loadRates() {
        try {
            const res = await fetch(`${this.API_BASE_URL}/api/rates`);
            if (res.ok) {
                this.rates = await res.json();
                this.renderRatesTable(); // Re-render if view is active
            } else {
                console.error("Failed to load rates");
            }
        } catch (err) {
            console.log("Using offline rates fallback");
            // Fallback for demo if server off
            this.rates = [
                { id: 1, name: "River Sand", unit: "Unit (Load)", price: 4500 },
                { id: 2, name: "M-Sand", unit: "Unit (Load)", price: 3800 },
            ];
        }
    },

    async saveRates() {
        if (!this.currentUser || this.currentUser.role !== 'admin') {
            alert("Unauthorized: Only Admins can update rates.");
            return;
        }

        // Gather data from inputs
        const rows = document.querySelectorAll('#rates-table-body tr');
        const updates = [];

        rows.forEach(row => {
            const id = parseInt(row.dataset.id);
            const input = row.querySelector('input[type="number"]');
            if (input) {
                updates.push({ id, price: parseInt(input.value) });
            }
        });

        try {
            const res = await fetch(`${this.API_BASE_URL}/api/rates`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    updates,
                    username: this.currentUser.username,
                    role: this.currentUser.role
                })
            });
            if (res.ok) {
                alert("Rates updated successfully! Syncing with catalog...");
                await this.loadRates();
                await this.loadProducts(); // Sync catalog
            } else {
                alert("Update failed: " + res.statusText);
            }
        } catch (err) {
            alert("Server Connectivity Error while saving rates.");
        }
    },

    async loadHistory() {
        if (!this.currentUser || this.currentUser.role !== 'admin') {
            window.location.hash = '#/home';
            return;
        }
        try {
            const res = await fetch(`${this.API_BASE_URL}/api/bookings?role=${this.currentUser.role}`);
            const data = await res.json();
            const tbody = document.getElementById('history-table-body');
            if (tbody) {
                if (data.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="5" class="p-8 text-center text-gray-500">No order history available yet.</td></tr>';
                } else {
                    tbody.innerHTML = data.map(log => `
                        <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                            <td class="px-6 py-4 text-xs text-gray-500">${log.date}</td>
                            <td class="px-6 py-4 font-bold text-gray-900 dark:text-gray-100">${log.item_name}</td>
                            <td class="px-6 py-4 text-primary font-bold">${log.price}</td>
                            <td class="px-6 py-4">
                                <a href="tel:${log.phone}" class="flex items-center gap-2 text-primary hover:underline">
                                    <span class="material-icons-round text-xs">phone</span>
                                    ${log.phone}
                                </a>
                            </td>
                            <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                <div class="flex items-start gap-2">
                                    <span class="material-icons-round text-xs mt-1 text-gray-400">place</span>
                                    ${log.place}
                                </div>
                            </td>
                        </tr>
                    `).join('');
                }
            }
        } catch (e) {
            console.error(e);
        }
    },

    async loadUserOrders() {
        if (!this.currentUser) return;
        try {
            const role = this.currentUser.role;
            const username = this.currentUser.username;
            const res = await fetch(`${this.API_BASE_URL}/api/bookings?role=${role}&username=${username}`);
            const data = await res.json();
            // No longer need to filter on frontend as backend handles it

            const list = document.getElementById('user-orders-list');
            if (list) {
                if (data.length === 0) {
                    list.innerHTML = `
                        <div class="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-12 text-center border-2 border-dashed border-gray-100 dark:border-gray-700">
                            <span class="material-icons-round text-6xl text-gray-200 dark:text-gray-700 mb-4 block">receipt_long</span>
                                    <p class="text-gray-500 font-medium">You haven't placed any orders yet.</p>
                                    <a href="#/catalog" class="inline-block mt-4 text-primary font-bold hover:underline">Browse Catalog</a>
                                </div>
                            `;
                } else {
                    list.innerHTML = data.map(order => `
                                <div class="bg-white dark:bg-surface-dark p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                                    <div class="flex justify-between items-start mb-4">
                                        <div>
                                            <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest">${order.date}</p>
                                            <h3 class="text-xl font-bold dark:text-white">${order.item_name}</h3>
                                        </div>
                                        <span class="bg-green-50 text-green-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase">Order Placed</span>
                                    </div>
                            <div class="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-800">
                                <span class="font-bold text-primary">${order.price}</span>
                                <div class="flex gap-4 text-xs text-gray-500">
                                    <span>Phone: ${order.phone}</span>
                                </div>
                            </div>
                        </div>
                    `).join('');
                }
            }
        } catch (e) { console.error(e); }
    },

    async loadStats() {
        if (!this.currentUser || this.currentUser.role !== 'admin') return;
        try {
            const res = await fetch(`${this.API_BASE_URL}/api/admin/stats?role=${this.currentUser.role}`);
            if (res.ok) {
                const stats = await res.json();
                const userEl = document.getElementById('stat-total-users');
                const orderEl = document.getElementById('stat-total-orders');
                if (userEl) userEl.textContent = stats.userCount;
                if (orderEl) orderEl.textContent = stats.orderCount;
            }
        } catch (e) { console.error(e); }
    },

    async loadAdminUsers() {
        if (!this.currentUser || this.currentUser.role !== 'admin') return;
        try {
            const res = await fetch(`${this.API_BASE_URL}/api/admin/users?role=${this.currentUser.role}`);
            if (res.ok) {
                const users = await res.json();
                const tbody = document.getElementById('users-table-body');
                if (tbody) {
                    tbody.innerHTML = users.map(user => `
                        <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                            <td class="px-6 py-4 text-xs text-gray-400 font-mono">#${user.id}</td>
                            <td class="px-6 py-4">
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                                        ${user.username.charAt(0).toUpperCase()}
                                    </div>
                                    <span class="font-bold text-gray-900 dark:text-gray-100">${user.username}</span>
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                <a href="tel:${user.phone}" class="text-sm text-primary hover:underline font-medium">${user.phone}</a>
                            </td>
                            <td class="px-6 py-4">
                                <span class="px-2 py-1 rounded text-[10px] font-bold uppercase ${user.role === 'admin' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'}">
                                    ${user.role}
                                </span>
                            </td>
                            <td class="px-6 py-4 text-right">
                                <button onclick="alert('Demo Context: User details for #'+${user.id})" class="p-2 text-gray-400 hover:text-primary transition-colors">
                                    <span class="material-icons-round text-sm">settings</span>
                                </button>
                            </td>
                        </tr>
                    `).join('');
                }
            }
        } catch (e) { console.error(e); }
    },

    showAddUserModal() {
        const existing = document.getElementById('add-user-modal');
        if (existing) existing.remove();

        const modal = document.createElement('div');
        modal.id = 'add-user-modal';
        modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4';
        modal.innerHTML = `
            <div class="bg-white dark:bg-surface-dark w-full max-w-md rounded-2xl p-8 shadow-2xl">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="font-display font-bold text-2xl text-gray-900 dark:text-white uppercase">ADD NEW USER</h3>
                    <button onclick="document.getElementById('add-user-modal').remove()" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition"><span class="material-icons-round">close</span></button>
                </div>
                <form onsubmit="App.saveNewUser(event)" class="space-y-6">
                    <div>
                        <label class="block text-xs font-bold text-gray-500 mb-1">Username</label>
                        <input name="username" required class="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-500 mb-1">Phone Number</label>
                        <input name="phone" required class="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-500 mb-1">Password</label>
                        <input name="password" type="password" required class="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-500 mb-1">Role</label>
                        <select name="role" class="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border-none focus:ring-2 focus:ring-primary">
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button type="submit" class="w-full py-4 bg-primary text-black font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-orange-600 transition uppercase tracking-widest">CREATE ACCOUNT</button>
                </form>
            </div>
        `;
        document.body.appendChild(modal);
    },

    async saveNewUser(e) {
        e.preventDefault();
        const f = e.target;
        const username = f.username.value;
        const password = f.password.value;
        const role = f.role.value;

        try {
            const res = await fetch(`${this.API_BASE_URL}/api/admin/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    password,
                    phone: f.phone.value,
                    role,
                    adminRole: this.currentUser.role
                })
            });
            if (res.ok) {
                alert("User created successfully!");
                document.getElementById('add-user-modal').remove();
                this.loadAdminUsers();
                this.loadStats();
            } else {
                const data = await res.json();
                alert("Error: " + data.error);
            }
        } catch (e) { alert("Server Error"); }
    },

    // Products Data
    products: [],

    async loadProducts() {
        try {
            const res = await fetch(`${this.API_BASE_URL}/api/products`);
            if (res.ok) {
                const data = await res.json();
                this.products = data.map(p => ({
                    ...p,
                    badge: p.badge_text ? { text: p.badge_text, color: p.badge_color } : null
                }));
                if (window.location.hash.includes('catalog')) {
                    this.renderCatalog(this.products);
                }
            }
        } catch (err) {
            console.error("Failed to load products from API", err);
            // Fallback content if API fails
            this.products = [
                {
                    id: 'p1',
                    rateId: 1,
                    type: 'material',
                    name: 'Quality River Sand',
                    description: 'Premium filtered sand for construction.',
                    price: '₹4,500',
                    unit: '/ Unit',
                    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqvw2mM46N37gZmFMXVmL8EmXi8pLMB_vWwzjA1K7Hp9FW8dJcUf2Ww3oZpcSIaNLS4NOAaQYV2_q-C8LRy3xqjZUdo3NQT6nafjYvhQ14gPlBSaIpXirD94L68AbqQTCzn0_T9SSpfnyvpkJ_PYgwEgN3hhf7EWjrfAy2lTFUBP15Mt987f_4UJMGgYhsHEA-QtHaKokSQf43rqC6TnzkorgQZ2dKq1BoCzp3o6i_pJsFncjDcbbcng3Lq5Z7RoiLmTguDf4bd1w',
                    category: 'River Sand',
                    badge: { text: 'In Stock', color: 'bg-green-500' }
                }
            ];
        }
    },

    saveProducts() {
        localStorage.setItem('krg_products', JSON.stringify(this.products));
    },

    // Product Management (Admin)
    // Product Management (Admin)
    showAddProductModal(productId = null) {
        let isEdit = false;
        let p = {};

        if (productId) {
            isEdit = true;
            p = this.products.find(x => x.id === productId) || {};
        }

        const title = isEdit ? 'Edit Product' : 'Add New Product';
        const nameVal = p.name || '';
        const catVal = p.category || 'River Sand';
        const descVal = p.description || '';
        // Extract number from price string if needed, or just use raw string for simplicity in editing
        const priceVal = p.price ? p.price.replace('₹', '').replace(/,/g, '') : '';
        const unitVal = p.unit || '';
        const imgVal = p.image || 'https://via.placeholder.com/300x200';
        const idVal = p.id || '';

        // Inject Modal if not exists (or always re-inject to clear state easily)
        // For simplicity, we'll remove existing first if any to ensure fresh state
        const existing = document.getElementById('add-product-modal');
        if (existing) existing.remove();

        const modal = document.createElement('div');
        modal.id = 'add-product-modal';
        modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4';
        modal.innerHTML = `
            <div class="bg-white dark:bg-surface-dark w-full max-w-lg rounded-2xl p-4 md:p-8 shadow-2xl animate-in fade-in zoom-in duration-200 maxHeight-screen overflow-y-auto">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="font-display font-bold text-xl md:text-2xl text-gray-900 dark:text-white">${title}</h3>
                    <button onclick="App.closeAddProductModal()" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition"><span class="material-icons-round">close</span></button>
                </div>
                <form onsubmit="App.saveNewProduct(event)" class="space-y-4">
                    <input type="hidden" name="productId" value="${idVal}">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-bold text-gray-500 mb-1">Name</label>
                            <input name="name" value="${nameVal}" required class="w-full text-sm p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border-none focus:ring-2 focus:ring-primary" placeholder="e.g. M-Sand 2.0" />
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-500 mb-1">Category</label>
                            <select name="category" class="w-full text-sm p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border-none focus:ring-2 focus:ring-primary">
                                <option ${catVal === 'River Sand' ? 'selected' : ''}>River Sand</option>
                                <option ${catVal === 'Aggregates' ? 'selected' : ''}>Aggregates</option>
                                <option ${catVal === 'Cement' ? 'selected' : ''}>Cement</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-500 mb-1">Description</label>
                        <textarea name="description" required rows="2" class="w-full text-sm p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border-none focus:ring-2 focus:ring-primary" placeholder="Short description...">${descVal}</textarea>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-bold text-gray-500 mb-1">Price (₹)</label>
                            <input name="price" value="${priceVal}" required class="w-full text-sm p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border-none focus:ring-2 focus:ring-primary" placeholder="e.g. 4500" />
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-500 mb-1">Unit</label>
                            <input name="unit" value="${unitVal}" required class="w-full text-sm p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border-none focus:ring-2 focus:ring-primary" placeholder="e.g. / Unit" />
                        </div>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-500 mb-1">Image URL</label>
                        <input name="image" value="${imgVal}" required class="w-full text-sm p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border-none focus:ring-2 focus:ring-primary" placeholder="https://..." />
                    </div>
                    <button type="submit" class="w-full py-3 bg-primary text-black font-bold rounded-xl mt-4 hover:bg-orange-600 transition">${isEdit ? 'Update Product' : 'Add Product'}</button>
                </form>
            </div>
        `;
        document.body.appendChild(modal);
    },

    closeAddProductModal() {
        const modal = document.getElementById('add-product-modal');
        if (modal) modal.remove();
    },

    async saveNewProduct(e) {
        e.preventDefault();
        if (!this.currentUser || this.currentUser.role !== 'admin') return;

        const f = e.target;
        const id = f.productId.value;
        const isEdit = !!id;

        const product = {
            id: id || 'p' + Date.now(),
            name: f.name.value,
            category: f.category.value,
            description: f.description.value,
            price: '₹' + f.price.value,
            unit: f.unit.value,
            image: f.image.value,
            type: f.category.value === 'Rentals' ? 'equipment' : 'material',
            rateId: null,
            badge_text: '',
            badge_color: ''
        };

        try {
            const res = await fetch(`${this.API_BASE_URL}/api/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ product, role: this.currentUser.role })
            });
            if (res.ok) {
                alert(isEdit ? 'Product Updated Successfully!' : 'Product Added Successfully!');
                this.loadProducts();
                this.closeAddProductModal();
            } else {
                alert('Failed to save product');
            }
        } catch (err) {
            console.error(err);
            alert('Server Error');
        }
    },

    async deleteProduct(id) {
        if (!this.currentUser || this.currentUser.role !== 'admin') return;
        if (!confirm("Are you sure?")) return;

        try {
            const res = await fetch(`${this.API_BASE_URL}/api/products/${id}?role=${this.currentUser.role}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                alert('Product Deleted.');
                this.loadProducts();
            } else {
                alert('Delete failed');
            }
        } catch (err) {
            console.error(err);
            alert('Server Error');
        }
    },

    // Booking Flow
    showBookingModal(itemName, itemPrice) {
        const existing = document.getElementById('booking-modal');
        if (existing) existing.remove();

        const modal = document.createElement('div');
        modal.id = 'booking-modal';
        modal.className = 'fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-300';

        // Modal State
        this._bookingState = {
            step: 1,
            itemName,
            itemPrice,
            phone: this.currentUser ? this.currentUser.phone : '',
            place: ''
        };

        this.renderBookingStep(modal);
        document.body.appendChild(modal);
    },

    renderBookingStep(modalContainer) {
        const { step, itemName, itemPrice, phone } = this._bookingState;
        const container = modalContainer || document.getElementById('booking-modal');
        if (!container) return;

        let stepHtml = '';

        if (step === 1) {
            stepHtml = `
                <div class="bg-white/80 dark:bg-surface-dark/80 backdrop-blur-xl w-full max-w-md rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/30 animate-in zoom-in-95 duration-300">
                    <div class="flex justify-between items-start mb-8">
                        <div>
                            <h3 class="font-display font-bold text-3xl tracking-tight text-gray-900 dark:text-white">Place Order</h3>
                            <p class="text-xs text-gray-500 mt-2 font-medium uppercase tracking-widest">${itemName} • <span class="text-primary font-bold">${itemPrice}</span></p>
                        </div>
                        <button onclick="document.getElementById('booking-modal').remove()" class="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-all active:scale-95"><span class="material-icons-round text-gray-400">close</span></button>
                    </div>
                    <form onsubmit="App.handleBookingNext(event)" class="space-y-6">
                        <div class="space-y-1.5">
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Your Mobile Number</label>
                            <div class="relative group">
                                <span class="absolute left-4 top-1/2 -translate-y-1/2 material-icons-round text-gray-400 text-sm group-focus-within:text-primary transition-colors">phone</span>
                                <input type="tel" name="phone" required pattern="[0-9]{10}" maxlength="10" 
                                       class="w-full text-sm pl-11 pr-4 py-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border-2 border-transparent focus:border-primary/20 focus:bg-white dark:focus:bg-gray-900 outline-none transition-all" 
                                       placeholder="10-digit mobile number" title="Please enter exactly 10 digits" 
                                       oninput="this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10)"
                                       value="${this._bookingState.phone}" />
                            </div>
                        </div>
                        <div class="space-y-1.5">
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Delivery Location</label>
                            <div class="relative group">
                                <span class="absolute left-4 top-4 material-icons-round text-gray-400 text-sm group-focus-within:text-primary transition-colors">place</span>
                                <textarea name="place" required rows="3" class="w-full text-sm pl-11 pr-4 py-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border-2 border-transparent focus:border-primary/20 focus:bg-white dark:focus:bg-gray-900 outline-none transition-all resize-none" placeholder="Enter full address or site details...">${this._bookingState.place}</textarea>
                            </div>
                        </div>
                            <button type="submit" class="w-full py-4 bg-primary text-black font-bold rounded-2xl hover:bg-primary/90 active:scale-[0.98] transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3">
                                <span>Place Order</span>
                                <span class="material-icons-round text-sm">arrow_forward</span>
                            </button>
                        </div>
                    </form>
                </div>
            `;
        }


        container.innerHTML = stepHtml;
    },

    async handleBookingNext(e) {
        e.preventDefault();
        const f = e.target;
        const phone = f.phone.value;

        if (!/^[0-9]{10}$/.test(phone)) {
            alert("Error: Phone number must be exactly 10 digits.");
            return;
        }

        this._bookingState.phone = phone;
        this._bookingState.place = f.place.value;

        this.submitBooking();
    },



    async submitBooking() {
        const { itemName, itemPrice, phone, place } = this._bookingState;
        const bookingData = {
            item_name: itemName,
            price: itemPrice,
            phone: phone,
            place: place,
            customer_name: this.currentUser ? this.currentUser.username : 'Guest'
        };

        try {
            const res = await fetch(`${this.API_BASE_URL}/api/bookings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookingData)
            });
            if (res.ok) {
                // Premium Success UI
                const container = document.getElementById('booking-modal');
                container.innerHTML = `
                    <div class="bg-white/90 dark:bg-surface-dark/90 backdrop-blur-xl w-full max-w-md rounded-3xl p-10 shadow-2xl text-center animate-success">
                        <div class="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span class="material-icons-round text-5xl">check_circle</span>
                        </div>
                        <h3 class="font-display font-bold text-3xl text-gray-900 dark:text-white mb-2 uppercase">Order Placed!</h3>
                        <p class="text-gray-500 dark:text-gray-400 mb-8 font-medium">Your order for <span class="text-primary font-bold">${itemName}</span> has been confirmed.</p>
                        <button onclick="document.getElementById('booking-modal').remove()" class="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all">Continue Browsing</button>
                    </div>
                `;
                if (window.location.hash.includes('orders')) this.loadUserOrders();
            } else {
                alert("Final submission failed.");
            }
        } catch (err) {
            alert("Connectivity Error during final submission.");
        }
    },

    // Catalog Logic
    renderCatalog(items) {
        const grid = document.getElementById('catalog-grid');
        if (!grid) return;

        if (items.length === 0) {
            grid.innerHTML = `
                <div class="col-span-full py-20 text-center">
                    <span class="material-icons-round text-6xl text-gray-200 dark:text-gray-700 mb-4 block">search_off</span>
                    <p class="text-gray-500 font-medium">No items found matching your filter.</p>
                </div>
            `;
        }

        // Show/Hide Add Product Button
        const addBtn = document.getElementById('add-product-btn');
        if (addBtn) {
            if (this.currentUser && this.currentUser.role === 'admin') {
                addBtn.classList.remove('hidden');
            } else {
                addBtn.classList.add('hidden');
            }
        }

        if (items.length === 0) return;

        grid.innerHTML = items.map(item => {
            // Dynamic Price Lookup from Rates
            let displayPrice = item.price;
            let displayUnit = item.unit;

            // Try matching by rateId or Name
            const linkedRate = this.rates.find(r => r.id === item.rateId || item.name.toLowerCase().includes(r.name.toLowerCase()));

            if (linkedRate) {
                displayPrice = '₹' + linkedRate.price.toLocaleString('en-IN');
            }

            const isAdmin = this.currentUser && this.currentUser.role === 'admin';
            const editBtn = isAdmin ? `
                <div class="absolute top-3 right-3 z-10 flex gap-2">
                    <button onclick="App.deleteProduct('${item.id}'); event.stopPropagation();" class="p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 hover:scale-110 transition-all border-2 border-white dark:border-gray-800">
                        <span class="material-icons-round text-sm">delete</span>
                    </button>
                    <button onclick="App.showAddProductModal('${item.id}'); event.stopPropagation();" class="p-2 bg-white dark:bg-black text-black dark:text-white rounded-full shadow-lg hover:scale-110 transition-transform border-2 border-gray-100 dark:border-gray-700">
                        <span class="material-icons-round text-sm">edit</span>
                    </button>
                </div>
            ` : '';

            const isEquipment = item.type === 'equipment';
            const isLoggedIn = !!this.currentUser;

            // Action Button Logic
            let actionBtn = "";
            actionBtn = isEquipment ?
                `<button onclick="App.showBookingModal('${item.name.replace(/'/g, "\\'")}', '${displayPrice.replace(/'/g, "\\'")}'); event.stopPropagation();" class="px-4 py-2 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-black font-bold uppercase text-[10px] tracking-widest hover:bg-primary hover:text-black transition-all">Book Now</button>` :
                `<button onclick="App.showBookingModal('${item.name.replace(/'/g, "\\'")}', '${displayPrice.replace(/'/g, "\\'")}'); event.stopPropagation();" class="w-10 h-10 flex items-center justify-center rounded-xl bg-primary text-black hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/10">
                        <span class="material-icons-round">shopping_cart</span>
                    </button>`;

            // Features Logic (if present)
            const featuresHtml = (item.features && item.features.length > 0) ? `
                <div class="flex flex-wrap gap-2 mt-3">
                    ${item.features.map(f => `
                    <div class="flex items-center gap-1 text-[10px] text-gray-500 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded">
                        <span class="material-icons-round text-primary text-xs">${f.icon}</span> ${f.text}
                    </div>
                    `).join('')}
                </div>
            ` : '';

            return `
                <div class="bg-white dark:bg-surface-dark rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col hover:shadow-xl transition-shadow group relative h-full">
                    ${editBtn}
                    <div class="relative h-48 w-full mb-4 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                        <img id="img-${item.id}" alt="${item.name}" class="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700" src="${item.image}"/>
                        ${item.badge ? `<span class="absolute top-3 left-3 ${item.badge.color} text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">${item.badge.text}</span>` : ''}
                    </div>
                    <div class="flex-1 flex flex-col">
                        <h3 class="font-bold text-gray-900 dark:text-white text-lg mb-1 leading-tight">${item.name}</h3>
                        <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">${item.description}</p>
                        ${featuresHtml}
                    </div>
                    <div class="mt-4 flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
                        <span class="font-display font-bold text-2xl text-primary flex items-baseline gap-1">
                            ${displayPrice} 
                            <span class="text-xs text-gray-400 font-normal truncate max-w-[80px]">${displayUnit}</span>
                        </span>
                        ${actionBtn}
                    </div>
                </div>`;
        }).join('');
    },

    setupCatalogFilters() {
        const searchInput = document.querySelector('input[placeholder*="Search"]');
        const filterBtns = document.querySelectorAll('nav ul li button');

        let activeCategory = 'All';
        let searchQuery = '';

        const filterProducts = () => {
            let filtered = this.products;

            // Filter by Category
            if (activeCategory !== 'All') {
                filtered = filtered.filter(p => p.category === activeCategory);
            }

            // Filter by Search
            if (searchQuery) {
                const q = searchQuery.toLowerCase();
                filtered = filtered.filter(p =>
                    p.name.toLowerCase().includes(q) ||
                    p.description.toLowerCase().includes(q) ||
                    p.category.toLowerCase().includes(q)
                );
            }

            this.renderCatalog(filtered);
        };

        if (searchInput) {
            searchInput.oninput = (e) => {
                searchQuery = e.target.value;
                filterProducts();
            };
        }

        filterBtns.forEach(btn => {
            btn.onclick = () => {
                // Update active state
                filterBtns.forEach(b => {
                    b.classList.remove('bg-primary', 'text-black', 'shadow-lg');
                    b.classList.add('bg-white', 'dark:bg-surface-dark', 'text-gray-600', 'dark:text-gray-300');
                });
                btn.classList.remove('bg-white', 'dark:bg-surface-dark', 'text-gray-600', 'dark:text-gray-300');
                btn.classList.add('bg-primary', 'text-black', 'shadow-lg');

                activeCategory = btn.textContent;
                filterProducts();
            };
        });
    },

    renderRatesTable() {
        const tbody = document.getElementById('rates-table-body');
        if (!tbody) return;

        tbody.innerHTML = this.rates.map(item => {
            const isAdmin = this.currentUser && this.currentUser.role === 'admin';

            return `
            <tr data-id="${item.id}" class="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                <td class="px-6 py-4 font-bold text-gray-900 dark:text-gray-100">${item.name}</td>
                <td class="px-6 py-4 text-sm text-gray-500">${item.unit}</td>
                <td class="px-6 py-4 text-right">
                    <div class="inline-flex items-center gap-2 justify-end">
                        <span class="text-gray-400 font-bold group-hover:text-primary">₹</span>
                        ${isAdmin ?
                    `<input type="number" 
                               value="${item.price}" 
                               class="w-24 px-2 py-1 bg-gray-100 dark:bg-gray-700 border-none rounded text-right font-bold focus:ring-2 focus:ring-primary transition-all"
                        />` :
                    `<span class="font-bold text-lg">${item.price}</span>`
                }
                    </div>
                </td>
            </tr>
        `}).join('');

        // Hide Update Button if not admin
        const updateBtn = document.querySelector('button[onclick="App.saveRates()"]');
        if (updateBtn) {
            if (this.currentUser && this.currentUser.role === 'admin') {
                updateBtn.classList.remove('hidden');
            } else {
                updateBtn.classList.add('hidden');
            }
        }

        // Update date too
        const dateEl = document.getElementById('last-updated-date');
        if (dateEl) dateEl.textContent = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    },

    setupTheme() {
        if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    },

    toggleDarkMode() {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    },

    setupMobileMenu() {
        // Handle Mobile Drawer
        const menuButtons = document.querySelectorAll('button');
        const mBtn = Array.from(menuButtons).find(btn => btn.innerText.includes('menu'));

        if (mBtn) {
            mBtn.onclick = () => {
                const drawer = document.getElementById('mobile-drawer');
                const content = document.getElementById('drawer-content');
                if (drawer && content) {
                    drawer.classList.remove('pointer-events-none', 'opacity-0');
                    content.classList.remove('translate-x-full');
                }
            };
        }

        // Listen for backdrop clicks
        const drawer = document.getElementById('mobile-drawer');
        if (drawer) {
            drawer.onclick = (e) => {
                if (e.target === drawer) this.closeMobileMenu();
            };
        }
    },

    closeMobileMenu() {
        const drawer = document.getElementById('mobile-drawer');
        const content = document.getElementById('drawer-content');
        if (drawer && content) {
            drawer.classList.add('pointer-events-none', 'opacity-0');
            content.classList.add('translate-x-full');
        }
    },

    async syncToGitHub() {
        if (!this.currentUser || this.currentUser.role !== 'admin') return;

        const btn = document.getElementById('nav-sync');
        const originalHtml = btn.innerHTML;

        btn.disabled = true;
        btn.innerHTML = `<span class="material-icons-round animate-spin text-sm">sync</span> SYNCING...`;

        try {
            const res = await fetch(`${this.API_BASE_URL}/api/admin/sync`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role: this.currentUser.role })
            });
            const data = await res.json();

            if (res.ok) {
                alert("GitHub Sync Successful!\n\nChanges are now live on GitHub Pages.");
            } else {
                alert("Sync Error: " + data.error);
            }
        } catch (err) {
            alert("Connection error. Is the server running?");
        } finally {
            btn.disabled = false;
            btn.innerHTML = originalHtml;
        }
    },

    shareSite() {
        if (navigator.share) {
            navigator.share({
                title: 'KRG Building Materials',
                text: 'Foundation for your future. Premium construction materials.',
                url: window.location.origin
            }).catch(console.error);
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(window.location.origin);
            alert("Site URL copied to clipboard! Share it with your other devices.");
        }
    }
};

// Global Exposure for HTML onclicks
window.toggleDarkMode = () => App.toggleDarkMode();

// Initialized by index.html load listener to ensure DOM is ready
// App.init();
