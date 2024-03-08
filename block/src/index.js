import { registerBlockType } from '@wordpress/blocks';
import { Card, CardBody ,TextControl,CardDivider} from '@wordpress/components';
const attributes = {
    currentUser: {
      type: 'int',
      default: 1
    },
    primaryColor: { type: "string",default: "#000000" },
    secondayColor: { type: "string",default: "#ffffff" },
    font: {type: "string",default: "monospace"}
  }

const save = props => {
    return (
      <div className="mt-block-user-card-wrapper" data-mt-attributes={JSON.stringify(props.attributes)}>
        <div className="mt-block-user-card">
        </div>
      </div>
    );
}

const edit = props => {

  function setPrimaryColor(e) {
    props.setAttributes({ primaryColor: e })
  }

  function setSecondaryColor(e) {
    props.setAttributes({ secondayColor: e })
  }

  function setFont(e) {
    props.setAttributes({ font: e })
  }
    return (
      <div className="mt-block-user-card-wrapper" data-mt-attributes={JSON.stringify(props.attributes)}>
        <div className="mt-block-user-card">
        <Card>
          <CardBody>
            <h3>Ewards</h3>
            <p>Enter theme color and font family</p>
            <TextControl 
              label="Primary Color" 
              value={props.attributes.primaryColor}  
              onChange={ ( value ) => setPrimaryColor( value ) } 
              placeholder="Primary Color" 
            />

            <TextControl
              label="Secondary Color"
              value={props.attributes.secondayColor}
              onChange={( value ) => setSecondaryColor( value )}
              placeholder="Secondary Color" 
            />

            <TextControl
              label="Font"
              value={ props.attributes.font }
              onChange={ ( value ) => setFont( value ) }
              placeholder="Font"
            />
          </CardBody>
          <CardDivider/>
        </Card>
        </div>
      </div>
    );
}

registerBlockType( 'gutenreact/ewards-block', {
    title: "eWards",
    category: "common",
    attributes,
    edit,
    save
} );
