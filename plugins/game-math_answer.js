//import db from '../lib/database.js'

let handler = m => m
handler.before = async function (m) {
    if (!/^-?[0-9]+(\.[0-9]+)?$/.test(m.text)) return !0
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.text || !/^▢ CUANTO ES/i.test(m.quoted.text)) return !0
    this.math = this.math ? this.math : {}
    if (!(id in this.math)) return this.reply(m.chat, 'El Juego a terminado', m)
    if (m.quoted.id == this.math[id][0].id) {
        let math = JSON.parse(JSON.stringify(this.math[id][1]))
        if (m.text == math.result) {
            global.db.data.users[m.sender].exp += math.bonus
            clearTimeout(this.math[id][3])
            delete this.math[id]
            m.reply(`╭─╮─᤻─᳒─᤻᳒「░⃟⃜🍭ꪳ۫₎۬〬${vs} ░⃟⃜🐾⁩」\n├❥ᰰຼ ✅ *Respuesta correcta!*\n├❥ᰰຼ Ganaste : *+${math.bonus} XP*\n╰┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭۫*`)
        } else {
            if (--this.math[id][2] == 0) {
                clearTimeout(this.math[id][3])
                delete this.math[id]
                m.reply(`╭─╮─᤻─᳒─᤻᳒「░⃟⃜🍭ꪳ۫₎۬〬${vs} ░⃟⃜🐾⁩」\n├❥ᰰຼ *Se acabó las oportunidades*\n├❥ᰰຼ Respuesta : *${math.result}*╰┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭۫*`)
      } else m.reply(`╭─╮─᤻─᳒─᤻᳒「░⃟⃜🍭ꪳ۫₎۬〬${vs} ░⃟⃜🐾⁩」\n├❥ᰰຼ ❎ *Respuesta incorrecta*\n├❥ᰰຼ Todavia hay  ${this.math[id][2]} oportunidades\n*╰┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭۫*`)
        }
    }
    return !0
}

export default handler
