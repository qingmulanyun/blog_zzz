# frozen_string_literal: true

module Exceptions
  # used in BlogZZZ repo
  class BlogzzzStandardError < StandardError
    @custom_status_code = 500
    attr_accessor :code, :message

    def initialize(code, message)
      self.code = code
      self.message = message
    end

    def custom_status
      self.class.class_eval { @custom_status_code }
    end
  end

  class UnauthorizedError < BlogzzzStandardError
    @custom_status_code = 403
  end

  class ResourceNotExists < BlogzzzStandardError
    @custom_status_code = 404
  end

  # mainly used in API
  module ErrorCode
    PARM_INVALID_CODE = 1001
    PARM_INVALID_MSG = "parameter '%s' can't be '%s'."

    PARM_CONFLICT_CODE = 1002

    UNAUTHORIZED_CODE = 1003
    UNAUTHORIZED_MSG = 'not authorized.'

    NOT_EXISTS_CODE = 1004
    NOT_EXISTS_MSG = "this %s doesn't exist."

    INTERNAL_ERROR_CODE = 1005

    EXCEED_MAX_NUMBER_CODE = 1006

    COMMON_ERROR_CODE = 2000
  end



  require 'rails/backtrace_cleaner'
  def self.log_err(exception, extra = nil)
    if exception.nil?
      return Rails.logger.error "err_extra=#{extra}"
    end
    # borrowed code from rails default log output
    annoted_source_code = exception.annoted_source_code.to_s if exception.respond_to?(:annoted_source_code)
    clean_backtrace = Rails::BacktraceCleaner.new.clean(exception.backtrace, :all)
    extra = caller_locations(1, 1)[0].label if extra.nil?

    message = "err_class=#{exception.class}, err_message=#{exception.message}, err_extra=#{extra}, \n"
    message = message + "err_annoted=#{annoted_source_code}, \n"
    message = message + "err_trace=#{clean_backtrace.join('\n')}"
    Rails.logger.error message
  end
end
