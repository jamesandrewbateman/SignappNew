module Spree
  module Admin
    class SignDataController < ApplicationController
      helper "spree/admin/navigation"
      layout "spree/layouts/admin"

      def index
        if params[:taxonomy_id]
          @taxonomy = Spree::Taxonomy.find(params[:taxonomy_id])
        end

        @signs = SignData.search_admin(params["taxon_id"], params["query"])
      end

      def show
        @sign = SignData.find params[:id]
      end

      def filter_results_ajax
        material_id = params[:material]
        @filtered_signs = SignData.all(:conditions => ['account_id IS NOT NULL AND spree_product_id = ?', material_id])
        render :json => {:results => render_to_string(:partial => 'filtered_sign_results')}
      end

      def filter_product_list_ajax
        material_type_id = params[:material_type_id]
        material_type = Spree::Taxon.find material_type_id
        product_id_array = []
        material_type.products.each do |mp|
          product_id_array << mp.id
        end
        @filtered_products = material_type.products.sort_by &:name
        @filtered_signs = SignData.all(:conditions => ['account_id IS NOT NULL AND spree_product_id IN (?)', product_id_array])
        render :json => {:list => render_to_string(:partial => 'filter_product_list_ajax'), :results => render_to_string(:partial => 'filtered_sign_results')}
      end

      def get_taxons_for_taxonomy
        #raise params.to_yaml
        @taxonomy = Spree::Taxonomy.find params[:taxonomy_id]
        @taxon_id_selected = params["taxon_id"]
        render :partial => "get_taxons_for_taxonomy"
      end

      def set_show_as_product_ajax
        show_as_product = params[:value]
        sign_data = SignData.find params[:id]
        sign_data.show_as_product = show_as_product
        sign_data.save
        render :json => "ok"
      end

      def delete_sign
        sign_data = SignData.find params[:id]
        sign_data.deleted_by_admin = true
        sign_data.save
        render :json => "ok"
      end
    end
  end
end