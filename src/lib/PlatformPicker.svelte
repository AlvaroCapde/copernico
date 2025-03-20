<script>
    export let values
    const platforms =  [
        'Instagram',
        'Facebook',
        'X',
        'TikTok',
        'Youtube',
        'LinkedIn',
        'Twitch'
    ]


</script>
<div class="w-full space-y-3">
    <h1 class="text-gray-800 font-semibold">Plataforma a asegurar <span class="ml-1 text-red-400">*</span></h1>
    <div class="grid w-full text-sm md:grid-cols-8 grid-cols-4 gap-x-4 gap-y-8 pb-lg">
        {#each platforms as platform}
            <div on:click={() => $values.plataforma = platform} class="w-16 h-16 flex items-center justify-center transition-all hover:cursor-pointer bg-white rounded-2xl shadow-md
            {$values.plataforma === platform ? 'border-2 border-primary bg-gradient-to-br from-white to-indigo-100 shadow-lg' : 'border border-gray-200'}
">
                <img src='/PlatformIcons/{platform}.svg' alt={platform}  class="w-10 h-10"/>
            </div>
        {/each}
    </div>
</div>

