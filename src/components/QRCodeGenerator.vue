<template>
    <div class="w-full max-w-4xl mx-auto p-6">
        <div class="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20
            shadow-2xl overflow-hidden">
            <div class="p-8 text-center border-b border-white/10">
                <h1 class="text-4xl font-bold text-white mb-2">
                    {{ t('qrGenerator') }}
                </h1>
                <p class="text-blue-100">{{ t('introduction') }}</p>
            </div>

            <div class="p-8">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div class="space-y-6">
                        <div class="space-y-4">
                            <h2 class="text-xl font-semibold text-white flex items-center gap-2">
                                <FileText class="w-5 h-5" />
                                {{ t('qrCodeType') }}
                            </h2>
                            <div class="grid grid-cols-2 gap-2">
                                <template v-for="tab of tabs" :key="tab.id">
                                    <button @click="activeTab = tab.id"
                                        :class="['p-4 rounded-xl border transition-all duration-200 flex items-center gap-3'
                                            , activeTab === tab.id ? 'bg-amber-500 border-amber-400 text-white shadow-lg'
                                            : 'bg-white/5 border-white/20 text-white hover:bg-white/10'
                                        ]">
                                        <component :is="tab.icon" class="w-5 h-5" />
                                        <span class="font-medium">{{ tab.label }}</span>
                                    </button>
                                </template>
                            </div>
                        </div>

                        <div class="space-y-4">
                            <h2 class="text-xl font-semibold text-white flex items-center gap-2">
                                <Pencil class="w-5 h-5" />
                                {{ t('content') }}
                            </h2>
                            <div class="relative">
                                <textarea v-model="qrValue" @change="generateQR($event.target.value)"
                                    :placeholder="currentTab?.placeholder"
                                    class="w-full p-4 rounded-xl bg-white/10 border border-white/20
                                    text-white placeholder-white focus:outline-none focus:ring-2
                                    focus:ring-amber-400 focus:border-transparent resize-none
                                    transition-all duration-200" :rows="4" />
                            </div>
                        </div>

                        <div class="space-y-4">
                            <h3 class="text-lg font-medium text-white flex items-center gap-2">
                                <Palette class="w-5 h-5" />
                                {{ t('customization') }}
                            </h3>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-blue-100 mb-2">
                                        {{ t('size') }}
                                    </label>
                                    <select v-model="options.width"
                                        @change="setOptions($event, 'width')"
                                        class="w-full p-3 rounded-lg bg-white/10 border border-white/20
                                        text-white focus:outline-none focus:ring-2 focus:ring-amber-400">
                                        <option value="128">{{ t('small') }} (128px)</option>
                                        <option value="256">{{ t('normal') }} (256px)</option>
                                        <option value="512">{{ t('large') }} (512px)</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-blue-100 mb-2">
                                        {{ t('margin') }}
                                    </label>
                                    <select :value="options.margin"
                                        @change="setOptions($event, 'margin')"
                                        class="w-full p-3 rounded-lg bg-white/10 border border-white/20
                                        text-white focus:outline-none focus:ring-2 focus:ring-amber-400">
                                        <option value="2">{{ t('few') }} (2)</option>
                                        <option value="4">{{ t('normal') }} (4)</option>
                                        <option value="8">{{ t('many') }} (8)</option>
                                    </select>
                                </div>
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-blue-100 mb-2">
                                        {{ t('frontColor') }}
                                    </label>
                                    <input type="color" :value="options.color.dark" @change="setOptions($event, 'dark')"
                                        class="w-full h-12 rounded-lg border-2 border-white/20 bg-white/10 cursor-pointer" />
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-blue-100 mb-2">
                                        {{ t('backColor') }}
                                    </label>
                                    <input type="color" :value="options.color.light" @change="setOptions($event, 'light')"
                                        class="w-full h-12 rounded-lg border-2 border-white/20 bg-white/10 cursor-pointer" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-6">
                        <h2 class="text-xl font-semibold text-white flex items-center gap-2">
                            <Maximize class="w-5 h-5" />
                            {{ t('preview') }}
                        </h2>

                        <div class="bg-white/5 rounded-2xl p-8 border border-white/10">
                            <template v-if="qrDataURL">
                                <div class="text-center space-y-6">
                                    <div class="inline-block p-4 bg-white rounded-2xl shadow-xl">
                                        <img :src="qrDataURL" alt="QR Kod" 
                                            class="w-full h-auto max-w-xs mx-auto" />
                                    </div>
                                    <button @click="downloadQR"
                                        class="inline-flex items-center gap-2 px-6 py-3 mb-5
                                        rounded-xl bg-green-500 hover:bg-green-600 text-white
                                        font-medium transition-colors duration-200 shadow-lg
                                        hover:shadow-xl transform hover:scale-105">
                                        <Download class="w-5 h-5" />
                                        {{ t('downloadQRCode') }}
                                    </button>
                                </div>
                            </template>
                            <template v-else>
                                <div class="text-center py-16">
                                    <div class="w-24 h-24 mx-auto mb-4 bg-white/10 rounded-2xl
                                    flex items-center justify-center">
                                        <FileText class="w-12 h-12 text-amber-300" />
                                    </div>
                                    <p class="text-white">
                                        {{ t('qrFieldContent') }}
                                    </p>
                                </div>
                            </template>
                            <template v-if="qrValue">
                                <div class="bg-white/5 rounded-xl p-4 border border-white/10">
                                    <h4 class="text-sm font-medium text-white mb-2">
                                        {{ t('enteredContent') }}
                                    </h4>
                                    <p class="text-white text-sm break-all">
                                        {{ formatValue(qrValue, activeTab) }}
                                    </p>
                                </div>
                            </template>
                        </div>
                        <button class="bg-white/10 flex w-full justify-center px-4 py-4 rounded-xl
                            text-white hover:bg-white/15 duration-300 cursor-pointer"
                            @click="changeLanguage">
                        {{ t('changeLanguage') }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import QRCode from 'qrcode'
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { FileText, Link, Download, Mail, Phone, Pencil, Palette, Maximize } from 'lucide-vue-next'

const { t, locale } = useI18n()
const activeTab = ref('text')
const qrDataURL = ref('')
const qrValue = ref('')
const options = ref({
    width: 256,
    margin: 4,
    color: {
        light: '#ffffff',
        dark: '#000000'
    }
})

const tabs = computed(() => ([
    { id: 'text', label: t('text'), icon: FileText, placeholder: t('enterTheTextHere') },
    { id: 'url', label: 'URL', icon: Link, placeholder: 'https://example.com' },
    { id: 'email', label: t('email'), icon: Mail, placeholder: 'ornek@example.com' },
    { id: 'phone', label: t('phone'), icon: Phone, placeholder: '+90 555 123 4567' }
]))

const currentTab = computed(() => tabs.value.find(tab => tab.id === activeTab.value))

const formatValue = (value, type) => {
    switch (type) {
        case 'url':
            return value.startsWith('http') ? value : `https://${value}`
        case 'email':
            return `mailto:${value}`
        case 'phone':
            return `tel:${value}`
        default:
            return value
    }
}

const generateQR = async (text) => {
    if (!text.trim()) {
        qrDataURL.value = ''
        return
    }

    try {
        const formattedValue = formatValue(text, activeTab.value)
        const dataURL = await QRCode.toDataURL(formattedValue, options.value)
        qrDataURL.value = dataURL
    }
    catch (error) {
        console.error('QR kod oluşturulurken bir hata oldu: ', error)
    }
}

const downloadQR = () => {
    if (!qrDataURL.value) return
    const link = document.createElement('a')
    link.download = `qr-code-${activeTab.value}-${Date.now()}.png`
    link.href = qrDataURL.value
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

const setOptions = (e, type) => {
    const value = e.target.value
    if (type === 'dark' || type === 'light')
        options.value.color[type] = value
    options.value[type] = value
    generateQR(qrValue, options.value)
}

const changeLanguage = () => {
    locale.value = locale.value === 'en' ? 'tr' : 'en'
}

watch(qrValue, (newValue) => {
    generateQR(newValue)
})
</script>