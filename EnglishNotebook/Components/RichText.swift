import SwiftUI

// Інлайн-розмітка з Content.json → AttributedString.
// Підтримувані теги: <b> <mark> <s> <u> <i> <small> <a href="…">, перенос рядка "\n",
// сутності &amp; &lt; &gt;.

enum RichText {
    private struct Style {
        var bold = false, italic = false, mark = false, strike = false, underline = false, small = false
        var link: URL?
    }

    static func attributed(_ source: String, baseFont: Font = .bodyText, color: Color = Theme.ink) -> AttributedString {
        var result = AttributedString()
        var stack: [Style] = [Style()]
        var i = source.startIndex
        var buffer = ""

        func flush() {
            guard !buffer.isEmpty else { return }
            let style = stack.last!
            var run = AttributedString(decodeEntities(buffer))
            var font = baseFont
            if style.small { font = .small }
            if style.bold && style.italic { font = font.weight(.bold).italic() }
            else if style.bold { font = font.weight(.bold) }
            else if style.italic { font = font.italic() }
            run.font = font
            run.foregroundColor = style.small ? Theme.muted : color
            if style.mark {
                run.backgroundColor = Theme.accentSoft
                run.foregroundColor = Theme.accent
                run.font = font.weight(.semibold)
            }
            if style.strike { run.strikethroughStyle = .single }
            if style.underline { run.underlineStyle = .single }
            if let link = style.link {
                run.link = link
                run.foregroundColor = Theme.accent
                run.underlineStyle = .single
            }
            result.append(run)
            buffer = ""
        }

        while i < source.endIndex {
            let ch = source[i]
            if ch == "<", let close = source[i...].firstIndex(of: ">") {
                let tag = String(source[source.index(after: i)..<close])
                flush()
                var style = stack.last!
                switch tag {
                case "b": style.bold = true; stack.append(style)
                case "i": style.italic = true; stack.append(style)
                case "mark": style.mark = true; stack.append(style)
                case "s": style.strike = true; stack.append(style)
                case "u": style.underline = true; stack.append(style)
                case "small": style.small = true; stack.append(style)
                case "/b", "/i", "/mark", "/s", "/u", "/small", "/a":
                    if stack.count > 1 { stack.removeLast() }
                default:
                    if tag.hasPrefix("a href=\"") {
                        let href = tag.dropFirst("a href=\"".count).dropLast()
                        style.link = URL(string: String(href))
                        stack.append(style)
                    } else {
                        buffer.append(contentsOf: source[i...close])   // невідомий тег — показати як текст
                    }
                }
                i = source.index(after: close)
            } else {
                buffer.append(ch)
                i = source.index(after: i)
            }
        }
        flush()
        return result
    }

    static func decodeEntities(_ s: String) -> String {
        s.replacingOccurrences(of: "&lt;", with: "<")
            .replacingOccurrences(of: "&gt;", with: ">")
            .replacingOccurrences(of: "&nbsp;", with: " ")
            .replacingOccurrences(of: "&amp;", with: "&")
    }

    /// Чистий текст без тегів (для accessibility і пошуку).
    static func plain(_ s: String) -> String {
        decodeEntities(s.replacingOccurrences(of: "<[^>]+>", with: "", options: .regularExpression))
    }
}

/// Текст із інлайн-розміткою.
struct RichTextView: View {
    var text: String
    var font: Font = .bodyText
    var color: Color = Theme.ink
    var lineSpacing: CGFloat = 5

    var body: some View {
        Text(RichText.attributed(text, baseFont: font, color: color))
            .lineSpacing(lineSpacing)
            .fixedSize(horizontal: false, vertical: true)
            .tint(Theme.accent)
    }
}
