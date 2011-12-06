class Emailer < ActionMailer::Base

  def mail(recipient, subject, message, sent_at = Time.now)
      @subject = subject
      @recipients = recipient
      @from = 'no-reply@officedesk.com'
      @sent_on = sent_at

      @body["title"] = subject
  	  @body["email"] = 'no-reply@officedesk.com'
   	  @body["message"] = message
      @headers = {}
   end
  

end
