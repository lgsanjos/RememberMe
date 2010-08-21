class NoteController < ApplicationController

  # POST /note
  def save

    @note = Note.find(:first, :conditions => { :UUID => params[:note][:UUID] })

    if @note.blank?
      @note = Note.new(params[:note])
    else
      @note.attributes=(params[:note])
    end

    if @note.save
      render :inline => "OK"
    else
      render :inline => "failed"
    end
  end


end
