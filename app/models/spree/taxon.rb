module Spree
  class Taxon < ActiveRecord::Base
    acts_as_nested_set :dependent => :destroy

    belongs_to :taxonomy #, :class_name => "Spree::Taxonomy"
    has_and_belongs_to_many :products, :join_table => 'spree_products_taxons'

    before_create :set_permalink

    attr_accessible :name, :parent_id, :position, :icon, :description, :permalink, :taxonomy_id

    validates :name, :presence => true

    has_attached_file :icon,
                      :styles => {:mini => '76x42#', :normal => '235x130#'},
                      :default_style => :normal,
                      :url => '/spree/taxons/:id/:style/:basename.:extension',
                      :path => ':rails_root/public/spree/taxons/:id/:style/:basename.:extension',
                      :default_url => '/assets/noimage/default_taxon.png'

    include ::Spree::ProductFilters # for detailed defs of filters

    # indicate which filters should be used for a taxon
    # this method should be customized to your own site
    def applicable_filters
      fs = []
      # fs << ProductFilters.taxons_below(self)
      ## unless it's a root taxon? left open for demo purposes

      fs << ProductFilters.price_filter if ProductFilters.respond_to?(:price_filter)
      fs << ProductFilters.brand_filter if ProductFilters.respond_to?(:brand_filter)
      fs
    end

    # Creates permalink based on Stringex's .to_url method
    def set_permalink
      if parent_id.nil?
        self.permalink = name.to_url if permalink.blank?
      else
        parent_taxon = Taxon.find(parent_id)
        self.permalink = [parent_taxon.permalink, (permalink.blank? ? name.to_url : permalink.split('/').last)].join('/')
      end
    end

    def active_products
      scope = products.active
      scope = scope.on_hand unless Spree::Config[:show_zero_stock_products]
      scope
    end

    def pretty_name
      ancestor_chain = self.ancestors.inject("") do |name, ancestor|
        name += "#{ancestor.name} -> "
      end
      ancestor_chain + "#{name}"
    end

    def children
      Spree::Taxon.where(:parent_id => id)
    end
  end
end
