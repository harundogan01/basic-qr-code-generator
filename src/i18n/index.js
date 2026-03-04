import { createI18n } from 'vue-i18n'

const messages = {
    en: {
        qrGenerator: 'QR Generator',
        introduction: 'Generate and customize QR codes with ease',
        qrCodeType: 'QR Code Type',
        content: 'Content',
        customization: 'Customization',
        size: 'Size',
        small: 'Small',
        normal: 'Normal',
        large: 'Large',
        margin: 'Margin',
        few: 'Few',
        normal: 'Normal',
        many: 'Many',
        frontColor: 'Front Color',
        backColor: 'Back Color',
        preview: 'Preview',
        downloadQRCode: 'Download QR Code',
        qrFieldContent: 'Enter content in the field above to generate QR code',
        enteredContent: 'Encoded Content',
        text: 'Text',
        email: 'E-mail',
        phone: 'Phone',
        enterTheTextHere: 'Enter your text here...',
        changeLanguage: 'Change Language'
    },
    tr: {
        qrGenerator: 'QR Oluşturucu',
        introduction: 'Kolayca QR kod oluşturun ve özelleştirin',
        qrCodeType: 'QR Kodu Türü',
        content: 'İçerik',
        customization: 'Özelleştirme',
        size: 'Boyut',
        small: 'Küçük',
        normal: 'Orta',
        large: 'Büyük',
        margin: 'Kenar Boşluğu',
        few: 'Az',
        many: 'Çok',
        frontColor: 'Ön Renk',
        backColor: 'Arka Renk',
        preview: 'Önizleme',
        downloadQRCode: 'QR Kodu İndir',
        qrFieldContent: 'QR kod oluşturmak için yukarıdaki alana içerik girin',
        enteredContent: 'Kodlanan İçerik',
        text: 'Metin',
        email: 'E-posta',
        phone: 'Telefon',
        enterTheTextHere: 'Metninizi buraya girin...',
        changeLanguage: 'Dili Değiştir'
    }
}

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'tr',
    messages
})
export default i18n