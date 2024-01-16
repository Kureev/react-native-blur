require "json"

new_arch_enabled = ENV['RCT_NEW_ARCH_ENABLED'] == '1'
package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-blur"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => "10.0", :tvos => "11.0", :visionos => "1.0" }
  s.source       = { :git => "https://github.com/react-native-community/react-native-blur.git" }

  s.source_files = "ios/**/*.{h,m,mm}"

  if defined?(install_modules_dependencies()) != nil
    install_modules_dependencies(s)
  else
    # Don't install the dependencies when we run `pod install` in the old architecture.
    if new_arch_enabled then
      folly_compiler_flags = '-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1 -Wno-comma -Wno-shorten-64-to-32'

      s.compiler_flags = folly_compiler_flags + " -DRCT_NEW_ARCH_ENABLED=1"
      s.pod_target_xcconfig    = {
          "HEADER_SEARCH_PATHS" => "\"$(PODS_ROOT)/boost\"",
          "CLANG_CXX_LANGUAGE_STANDARD" => "c++17"
      }

      s.dependency "React-RCTFabric"
      s.dependency "React-Codegen"
      s.dependency "RCT-Folly"
      s.dependency "RCTRequired"
      s.dependency "RCTTypeSafety"
      s.dependency "ReactCommon/turbomodule/core"
    else
      s.dependency "React-Core"
    end
  end
end
