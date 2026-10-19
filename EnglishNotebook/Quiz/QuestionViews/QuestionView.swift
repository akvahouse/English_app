import SwiftUI

/// Замикання завершення питання (як `finish` на сайті).
typealias QuestionFinish = (_ ok: Bool, _ userAnswer: String, _ correctText: String, _ wrongWhy: String?) -> Void

/// Диспетчер: вибирає вью за типом питання.
struct QuestionView: View {
    var question: Question
    var finish: QuestionFinish

    var body: some View {
        switch question {
        case .mc(let q, let options, let answer, _, let no):
            MCQuestionView(prompt: q, options: options, answer: answer, no: no, finish: finish)
        case .fill(let q, let answers, _, let no):
            FillQuestionView(prompt: q, answers: answers, no: no, finish: finish)
        case .order(let words, let answer, _, let no):
            OrderQuestionView(words: words, answer: answer, no: no, finish: finish)
        case .pic(let q, let options, let answer, _, let no):
            PicQuestionView(prompt: q, options: options, answer: answer, no: no, finish: finish)
        case .match(let q, let pairs, _):
            MatchQuestionView(prompt: q, pairs: pairs, finish: finish)
        case .sort(let q, let buckets, let items, _):
            SortQuestionView(prompt: q, buckets: buckets, items: items, finish: finish)
        case .gapbank(let q, let bank, let sentences, let answers, _, _):
            GapBankQuestionView(prompt: q, bank: bank, sentences: sentences, answers: answers, finish: finish)
        }
    }
}

// MARK: - Спільні елементи завдань

/// Стан відповіді для підсвічування (класи .ok / .bad на сайті).
enum AnswerState {
    case idle, ok, bad

    var stroke: Color {
        switch self {
        case .idle: return Theme.line
        case .ok: return Theme.ok
        case .bad: return Theme.bad
        }
    }

    var fill: Color {
        switch self {
        case .idle: return Theme.card
        case .ok: return Theme.okSoft
        case .bad: return Theme.badSoft
        }
    }
}

/// Текст питання (.q). Сайт екранує HTML, тому це звичайний текст.
struct QuestionPrompt: View {
    var text: String

    var body: some View {
        Text(text)
            .font(.question)
            .lineSpacing(4)
            .foregroundStyle(Theme.ink)
            .fixedSize(horizontal: false, vertical: true)
            .frame(maxWidth: .infinity, alignment: .leading)
    }
}

/// Підказка під питанням (.hint).
struct QuestionHint: View {
    var text: String

    var body: some View {
        Text(text)
            .font(.meta)
            .foregroundStyle(Theme.muted)
            .fixedSize(horizontal: false, vertical: true)
            .frame(maxWidth: .infinity, alignment: .leading)
    }
}

/// Слово-капсула (.word): банк слів у order і gapbank. Зона дотику збільшена до ≈44pt.
struct WordChip: View {
    var text: String
    var foreground: Color = Theme.accent
    var background: Color = Theme.accentSoft
    var stroke: Color?

    var body: some View {
        Text(text)
            .font(.callout)
            .foregroundStyle(foreground)
            .padding(.vertical, 7)
            .padding(.horizontal, 14)
            .background(background, in: RoundedRectangle(cornerRadius: 8, style: .continuous))
            .overlay {
                if let stroke {
                    RoundedRectangle(cornerRadius: 8, style: .continuous).stroke(stroke, lineWidth: 1)
                }
            }
            .padding(.vertical, 5)
            .contentShape(Rectangle())
    }
}

/// Варіанти відповіді: при натисканні зсув праворуч на 4pt (замість :hover translateX(5px)).
struct OptionButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .offset(x: configuration.isPressed ? 4 : 0)
            .animation(Motion.ease(0.18), value: configuration.isPressed)
    }
}
