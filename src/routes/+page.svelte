<script>

import Coberturas from "../lib/Coberturas.svelte";
import FloatingCart from "../lib/FloatingCart.svelte";
import Header from "../lib/Header.svelte";
</script>

<div class="bg-white">
    <FloatingCart/>
<!--    <Header/>-->

    <div class="relative isolate px-6 pt-14 lg:px-8">
        <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
            <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
        </div>

        <div class="mx-auto max-w-6xl py-32 sm:py-48 lg:py-56">

            <div class="text-left">
                <h1 class="text-balance text-2xl font-semibold tracking-tight text-gray-900 md:text-5xl">Protegemos tus activos digitales,  <span class="primary-text">hoy y siempre</span></h1>
                <p class="mt-8 text-pretty text-lg font-medium sm:text-xl/8">Contar con Copernico es asegurar tu presencia online y salvaguardar tus ingresos. </p>
                <div class="mt-10 flex items-center justify-center gap-x-6">
                    <a href="#coberturas" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Empezar ahora</a>
                </div>
            </div>
            <div class="mx-auto mt-28 flex flex-col md:flex-row justify-around">
                <div class="py-12 shadow-lg px-8 font-bold bg-[#E7E7E7] rounded-2xl">
                    <h2 class="text-pretty text-2xl md:text-5xl">250M <span class="text-primary">+</span></h2>
                    <p>Datos protegidos</p>
                </div>
                <div class="py-12 shadow-lg px-8 font-bold bg-[#E7E7E7] rounded-2xl">
                    <h2 class="text-pretty text-2xl md:text-5xl">300K <span class="text-primary">+</span></h2>
                    <p>Usuarios activos</p>
                </div>
                <div class="py-12 shadow-lg px-8 font-bold bg-[#E7E7E7] rounded-2xl">
                    <h2 class="text-pretty text-2xl md:text-5xl">10M <span class="text-primary">+</span></h2>
                    <p>Ingresos asegurados</p>
                </div>
                <div class="py-12 shadow-lg px-8 font-bold bg-[#E7E7E7] rounded-2xl">
                    <h2 class="text-pretty text-2xl md:text-5xl">75M <span class="text-primary">+</span></h2>
                    <p>Capital in funding</p>
                </div>
            </div>
        </div>



        <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
            <div class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
        </div>
    </div>
</div>
<div class="flex flex-col items-center justify-between mx-auto max-w-7xl md:flex-row">
    <div class="space-y-5 ">
        <h2 class="text-2xl sm:text-5xl font-bold">Plataformas aseguradas</h2>
        <p class="text-pretty text-lg max-w-2xl font-medium sm:text-xl/8">
            Protegemos influencers, creadores y empresas ante amenazas como hacekos, robo de identidad, ransomware, robo de datos y fraudes en redes sociales.
        </p>
        <div class="flex">
            <a href="#" class="text-sm/6  px-4 py-2 font-semibold border-2 hover:bg-primary hover:text-white transition-all border-primary rounded-full ">Explorar coberturas</a>
        </div>
    </div>
    <div class="">
        <img src="/Apps.png" class="w-[500px] motion-reduce:animate-spin z-10"/>
    </div>
</div>
<Coberturas/>