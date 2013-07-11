Spree::Image.class_eval do

  has_attached_file :attachment,
                    :styles => {
                        :micro => '40x40#', # thumbs under image
                        :mini => '75x40#', # thumbs under image
                        :small => '235x120#', # images on category view
                        :product => '470x260#', # full product image
                        :large => ['1000x750#',:jpg] # light box image
                    },
                    :default_style => :product,
                    :storage => :s3,
                    :s3_credentials => "#{Rails.root}/config/s3.yml",
                    :bucket => "signapp-production",
                    :s3_endpoint => 's3-eu-west-1.amazonaws.com',
                    :url => '/spree/products/:id/:style/:basename.:extension',
                    :path => ':rails_root/public/spree/products/:id/:style/:basename.:extension',
                    :convert_options => {
                        #:mini => "-resize 40x40 -background white -gravity center -extent 40x40 -quality 92 -strip -colorspace RGB",
                        #:micro => "-resize 62x35 -background white -gravity center -extent 62x35 -quality 92 -strip -colorspace RGB",
                        #:small => "-resize 120x70 -background white -gravity center -extent 120x70 -quality 92 -strip -colorspace RGB",
                        #:thumb => "-resize 270x155 -background white -gravity center -extent 270x155 -quality 92 -strip -colorspace RGB",
                        #:product => "-resize 520x300 -background white -gravity center -extent 520x300 -quality 92 -strip -colorspace RGB",
                        #:large => "-resize 1000x1000 -background white -gravity center -extent 1000x1000 -quality 92 -strip -colorspace RGB",
                        :micro => "-background transparent -gravity center -extent 40x40 -strip",
                        :mini => "-background transparent -gravity center -extent 75x40 -strip",
                        :small => "-background transparent -gravity center -extent 235x120 -strip",
                        :product => "-background transparent -gravity center -extent 470x260 -strip",
                        :large => "-background transparent -gravity center -extent 1000x750 -strip"

                    }

  # Load user defined paperclip settings
  if Spree::Config[:use_s3]
    s3_creds = {:access_key_id => Spree::Config[:s3_access_key], :secret_access_key => Spree::Config[:s3_secret], :bucket => Spree::Config[:s3_bucket]}
    Spree::Image.attachment_definitions[:attachment][:storage] = :s3
    Spree::Image.attachment_definitions[:attachment][:s3_credentials] = s3_creds
    Spree::Image.attachment_definitions[:attachment][:s3_headers] = ActiveSupport::JSON.decode(Spree::Config[:s3_headers])
    Spree::Image.attachment_definitions[:attachment][:bucket] = Spree::Config[:s3_bucket]
  end

end