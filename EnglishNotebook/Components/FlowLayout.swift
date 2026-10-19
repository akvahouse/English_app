import SwiftUI

/// Розкладка «в рядок із переносом» (CSS flex-wrap) — для чипів, банку слів, речень із пропусками.
struct FlowLayout: Layout {
    var spacing: CGFloat = 8
    var lineSpacing: CGFloat = 8
    var alignment: VerticalAlignment = .center

    func sizeThatFits(proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) -> CGSize {
        let width = proposal.width ?? .infinity
        let rows = arrange(subviews, width: width)
        let height = rows.reduce(0) { $0 + $1.height } + CGFloat(max(rows.count - 1, 0)) * lineSpacing
        let maxWidth = rows.map(\.width).max() ?? 0
        return CGSize(width: proposal.width ?? maxWidth, height: height)
    }

    func placeSubviews(in bounds: CGRect, proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) {
        let rows = arrange(subviews, width: bounds.width)
        var y = bounds.minY
        for row in rows {
            var x = bounds.minX
            for item in row.items {
                let dy: CGFloat
                switch alignment {
                case .top: dy = 0
                case .bottom: dy = row.height - item.size.height
                default: dy = (row.height - item.size.height) / 2
                }
                subviews[item.index].place(at: CGPoint(x: x, y: y + dy), proposal: ProposedViewSize(item.size))
                x += item.size.width + spacing
            }
            y += row.height + lineSpacing
        }
    }

    private struct Row { var items: [(index: Int, size: CGSize)] = []; var width: CGFloat = 0; var height: CGFloat = 0 }

    private func arrange(_ subviews: Subviews, width: CGFloat) -> [Row] {
        var rows: [Row] = []
        var row = Row()
        for (i, sub) in subviews.enumerated() {
            let size = sub.sizeThatFits(ProposedViewSize(width: width, height: nil))
            let extra = row.items.isEmpty ? 0 : spacing
            if !row.items.isEmpty && row.width + extra + size.width > width {
                rows.append(row)
                row = Row()
            }
            row.items.append((i, size))
            row.width += (row.items.count == 1 ? 0 : spacing) + size.width
            row.height = max(row.height, size.height)
        }
        if !row.items.isEmpty { rows.append(row) }
        return rows
    }
}
