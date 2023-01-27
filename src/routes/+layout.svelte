<script lang="ts">
	import '../styles/app.css';
</script>

<header class="flex flex-row p-4 bg-blue-400 text-white">
    <h1 class="flex-1 text-xl font-bold">Time Tracker</h1>
    <nav class="flex flex-row gap-3 font-semibold">
        <a href="/">Work Hours</a>
        <a href="/schedule">Schedule</a>
    </nav>
</header>
<slot />