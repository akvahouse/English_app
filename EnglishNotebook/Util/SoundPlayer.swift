import AVFoundation

/// Озвучка завдань (playSound на сайті): готовий mp3 з Resources/Audio, інакше — системний голос en-US.
/// Повільний режим: окремий `-slow.mp3`; якщо його немає — той самий запис зі швидкістю 0.7.
final class SoundPlayer {
    static let shared = SoundPlayer()

    private var player: AVAudioPlayer?
    private let synth = AVSpeechSynthesizer()
    private var sessionReady = false

    private init() {}

    func play(_ sound: QuestionSound, slow: Bool) {
        stop()
        prepareSession()
        if let key = sound.audio {
            let slowFile = slow && sound.audioSlow == true
            if let url = Self.url(key + (slowFile ? "-slow" : "")), let p = try? AVAudioPlayer(contentsOf: url) {
                if slow && !slowFile {
                    p.enableRate = true
                    p.rate = 0.7
                }
                player = p
                p.play()
                return
            }
        }
        speak(sound.say, slow: slow)
    }

    func stop() {
        player?.stop()
        player = nil
        if synth.isSpeaking { synth.stopSpeaking(at: .immediate) }
    }

    private func speak(_ text: String, slow: Bool) {
        let u = AVSpeechUtterance(string: text)
        u.voice = AVSpeechSynthesisVoice(language: "en-US")
        u.rate = AVSpeechUtteranceDefaultSpeechRate * (slow ? 0.6 : 1)
        synth.speak(u)
    }

    /// `.playback` — звук чути й тоді, коли iPhone на беззвучному режимі (як відео чи подкасти).
    private func prepareSession() {
        guard !sessionReady else { return }
        try? AVAudioSession.sharedInstance().setCategory(.playback, mode: .spokenAudio, options: [.duckOthers])
        try? AVAudioSession.sharedInstance().setActive(true)
        sessionReady = true
    }

    private static func url(_ name: String) -> URL? {
        Bundle.main.url(forResource: name, withExtension: "mp3")
            ?? Bundle.main.url(forResource: name, withExtension: "mp3", subdirectory: "Audio")
            ?? Bundle.main.url(forResource: name, withExtension: "mp3", subdirectory: "Resources/Audio")
    }
}
