Pod::Spec.new do |s|
  s.name         = "react-native-blur"
  s.version      = "0.7.9"
  s.source_files  = "ios/*.{h,m}"
  s.dependency 'React'
  s.platform = :ios, "8.0"
end
