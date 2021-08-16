//https://stripe.com/docs/payments/accept-a-payment?platform=react-native&ui=payment-sheet
import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  Button,
  StyleSheet,
  Alert
} from 'react-native'
import { CardField, StripeProvider, useStripe } from '@stripe/stripe-react-native'

const StripeText = () => {

  const { confirmPayment } = useStripe();
  const [key ,setKey ] = useState('');

  useEffect(() => {
    //Put API in fetch method ...!!
    fetch('http://localhost:3000/create-payment-intent', {
      method: 'POST'
    })
    .then(res => res.json())
    .then(res =>  {
      const intent = res.toString()
     //const intent = res as {clientSecret : string} // convert res to string for clientSecret
     alert(intent);
      setKey(intent);
    })
  }, [])

  const handlePayment = async() => {

    const {error} = await confirmPayment(key,{
      type:'Card',
      billingDetails:{
        email:'vijay.mobileappdev@gmail.com'
      }
    })

    if(!error){
      Alert.alert("Payment success")
    }
    else{
      alert("Error" , error.message)
    }
  }
  return (
    <View>
      <CardField
        postalCodeEnabled={false}
        placeholder={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30,
          marginTop: 50,
        }}
      // onCardChange={(cardDetails) => {
      //   console.log('cardDetails', cardDetails);
      // }}
      // onFocus={(focusedField) => {
      //   console.log('focusField', focusedField);
      // }}
      />
      <Button title="Pay now" onPress={handlePayment} />
    </View>
  )
}
const App = () => {

  return (

    <SafeAreaView>

      <StripeProvider
        publishableKey="pk_test_51JNGORSAIbATCDvB4WlikIPEVmnOzHinjQmo4Z45kaUT8eBhIEYzaMqdEl4PaxjdWWWiV1XqNQMutc3lBrVoYVm300AdYSm3S9"
        merchantIdentifier="merchant.identifier"
      >
        <StripeText />
      </StripeProvider>

    </SafeAreaView>
  )
}
export default App;

const styles = StyleSheet.create({

  container: {
    marginTop: 50,
    alignItems: 'center',
  },
  txthead: {
    fontSize: 20,
    fontWeight: '600',
    fontStyle: 'italic'
  }
})
