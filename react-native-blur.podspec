Pod::Spec.new do |s|
  s.name          = "react-native-blur"
  s.version       = "0.8.0"
  s.source_files  = "ios/*.{h,m}"
  s.platform      = :ios, "8.0"
  s.authors       = { "Alexey Kureev" => "kureev-mail@ya.ru" }
  s.license       = "MIT"
  s.summary       = "Component implementation for UIVisualEffectView's blur and vibrancy effect."
  s.homepage      = "https://github.com/react-native-fellowship/react-native-blur"
  s.source        = { :git => "https://github.com/react-native-fellowship/react-native-blur.git" }

  s.dependency 'React'
end
