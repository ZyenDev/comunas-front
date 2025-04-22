

   

const customFooter: React.FC = () => {
    return(
<>
<Button key="back" onClick={handleCancel}>
      Cancelar
    </Button>,
    <Button key="submit" type="primary" onClick={handleOk}>
      Registrar
    </Button>,
</>
    )
  }


  default export customFooter