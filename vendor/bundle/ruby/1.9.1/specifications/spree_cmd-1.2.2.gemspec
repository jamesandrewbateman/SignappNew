# -*- encoding: utf-8 -*-
# stub: spree_cmd 1.2.2 ruby lib

Gem::Specification.new do |s|
  s.name = "spree_cmd"
  s.version = "1.2.2"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.authors = ["Chris Mar"]
  s.date = "2012-11-19"
  s.description = "tools to create new Spree stores and extensions"
  s.email = ["chris@spreecommerce.com"]
  s.executables = ["spree", "spree_cmd"]
  s.files = ["bin/spree", "bin/spree_cmd"]
  s.homepage = "http://spreecommerce.com"
  s.require_paths = ["lib"]
  s.rubyforge_project = "spree_cmd"
  s.rubygems_version = "2.1.9"
  s.summary = "Spree Commerce command line utility"

  if s.respond_to? :specification_version then
    s.specification_version = 3

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_development_dependency(%q<rspec>, [">= 0"])
      s.add_runtime_dependency(%q<thor>, [">= 0.14.6"])
    else
      s.add_dependency(%q<rspec>, [">= 0"])
      s.add_dependency(%q<thor>, [">= 0.14.6"])
    end
  else
    s.add_dependency(%q<rspec>, [">= 0"])
    s.add_dependency(%q<thor>, [">= 0.14.6"])
  end
end
