class Note < ActiveRecord::Base

   public
   def conteudo_tratado
      Note.trata_conteudo self.conteudo
   end

   public
   def self.trata_conteudo(str)
     str.gsub("\n",'\n').gsub("'","\'").gsub('"','\"')
   end
end
