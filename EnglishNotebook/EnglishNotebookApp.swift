import SwiftUI

/// Маршрути навігації (аналог #/lesson/:id і #/quiz/:id на сайті).
enum Route: Hashable {
    case lesson(String)
    case quiz(String)
    case progress
}

/// Навігація, доступна з будь-якого екрана (кнопки «Усі уроки», «Конспект»).
@Observable
final class Router {
    var path: [Route] = []

    func home() { path.removeAll() }
    func openLesson(_ id: String) { path = [.lesson(id)] }
    func openQuiz(_ id: String) { path = [.lesson(id), .quiz(id)] }
    func openProgress() { path = [.progress] }
}

@main
struct EnglishNotebookApp: App {
    @State private var router = Router()
    @State private var progress = ProgressStore()
    @AppStorage(AppAppearance.storageKey) private var appearance: AppAppearance = .system

    var body: some Scene {
        WindowGroup {
            RootView()
                .environment(router)
                .environment(progress)
                .tint(Theme.accent)
                .preferredColorScheme(appearance.colorScheme)
        }
    }
}

struct RootView: View {
    @Environment(Router.self) private var router

    var body: some View {
        @Bindable var router = router
        NavigationStack(path: $router.path) {
            HomeView()
                .navigationDestination(for: Route.self) { route in
                    switch route {
                    case .lesson(let id):
                        if let lesson = ContentStore.shared.lesson(id) { LessonView(lesson: lesson) } else { HomeView() }
                    case .quiz(let id):
                        if let lesson = ContentStore.shared.lesson(id) { QuizView(lesson: lesson) } else { HomeView() }
                    case .progress:
                        StatsView()
                    }
                }
        }
    }
}

/// Меню «Уроки» в тулбарі — замінює сайдбар сайту.
struct LessonsMenu: View {
    @Environment(Router.self) private var router
    @AppStorage(AppAppearance.storageKey) private var appearance: AppAppearance = .system
    var current: String?

    var body: some View {
        Menu {
            Button {
                router.home()
            } label: {
                Label("Усі уроки", systemImage: "house")
            }
            Button {
                router.openProgress()
            } label: {
                Label("Мій прогрес", systemImage: "chart.bar")
            }
            Divider()
            ForEach(ContentStore.shared.lessons) { lesson in
                Button {
                    router.openLesson(lesson.id)
                } label: {
                    if lesson.id == current {
                        Label("\(lesson.number) · \(lesson.short)", systemImage: "checkmark")
                    } else {
                        Text("\(lesson.number) · \(lesson.short)")
                    }
                }
            }
            Divider()
            Picker(selection: $appearance) {
                ForEach(AppAppearance.allCases) { option in
                    Label(option.title, systemImage: option.systemImage).tag(option)
                }
            } label: {
                Label("Тема: \(appearance.title.lowercased())", systemImage: "paintpalette")
            }
            .pickerStyle(.menu)
        } label: {
            Label("Уроки", systemImage: "list.bullet")
        }
    }
}
