import SwiftUI

/// Кнопки «Слухати» / «Повільно» (.listen-bar на сайті). `autoPlay` — програти раз одразу після появи.
struct SoundBar: View {
    var sound: QuestionSound
    var autoPlay = true

    var body: some View {
        HStack(spacing: 10) {
            Button {
                SoundPlayer.shared.play(sound, slow: false)
            } label: {
                Label("Слухати", systemImage: "speaker.wave.2.fill")
            }
            .buttonStyle(PrimaryButtonStyle(fullWidth: false))
            Button {
                SoundPlayer.shared.play(sound, slow: true)
            } label: {
                Label("Повільно", systemImage: "tortoise.fill")
            }
            .buttonStyle(GhostButtonStyle(fullWidth: false))
        }
        .task {
            guard autoPlay else { return }
            try? await Task.sleep(for: .milliseconds(300))
            guard !Task.isCancelled else { return }
            SoundPlayer.shared.play(sound, slow: false)
        }
        .onDisappear { SoundPlayer.shared.stop() }
    }
}

/// Анімована сцена з емодзі (sceneHtml на сайті): кожне емодзі рухається по-своєму, зі зсувом у часі.
struct SceneView: View {
    var scene: String
    var size: CGFloat = 52

    private var parts: [String] {
        scene.filter { !$0.isWhitespace }.map(String.init)
    }

    /// Довгі сцени (до 5 емодзі) у вузькій клітинці не вміщаються — беремо перший розмір, що влазить.
    var body: some View {
        ViewThatFits(in: .horizontal) {
            ForEach([1.0, 0.8, 0.65, 0.5], id: \.self) { k in
                row(size * k)
            }
        }
        .accessibilityHidden(true)
    }

    private func row(_ size: CGFloat) -> some View {
        HStack(spacing: size * 0.15) {
            ForEach(Array(parts.enumerated()), id: \.offset) { k, emoji in
                animated(Text(emoji).font(.system(size: size)), size: size, kind: k % 5, delay: Double(k) * 0.37)
            }
        }
        .fixedSize()
    }

    /// bounce · float · wiggle · pulse · sway — по черзі, як класи a-* на сайті.
    @ViewBuilder private func animated(_ view: some View, size: CGFloat, kind: Int, delay: Double) -> some View {
        switch kind {
        case 0: view.floaty(amplitude: size * 0.12, duration: 1.2, delay: delay)
        case 1: view.floaty(amplitude: size * 0.08, duration: 3, delay: delay)
        case 2: view.sway(degrees: 10, duration: 0.9)
        case 3: view.pulse(scale: 1.12, duration: 1.6, delay: delay)
        default: view.sway(degrees: 6, duration: 3)
        }
    }
}

/// Сцена на «сцені» (.stage): м'яке тло під емодзі.
struct SceneStage: View {
    var scene: String

    var body: some View {
        SceneView(scene: scene, size: 52)
            .padding(.vertical, 22)
            .frame(maxWidth: .infinity)
            .background(Theme.accentSoft, in: RoundedRectangle(cornerRadius: 16, style: .continuous))
    }
}
