package com.anonymous.barcode_manager_new

import com.facebook.react.modules.network.OkHttpClientFactory
import com.facebook.react.modules.network.OkHttpClientProvider
import okhttp3.CertificatePinner
import okhttp3.OkHttpClient

class SSLPinningFactory : OkHttpClientFactory {
    override fun createNewNetworkModuleClient(): OkHttpClient {
        val certificatePinner = CertificatePinner.Builder()
            .add("gimicro.charmflex.com", "sha256/u5xbVqgj6LvbKxR49L3NJXEguL0eLy+YjqEzpHU2J5A=")
            .build()

        val clientBuilder = OkHttpClientProvider.createClientBuilder()
        return clientBuilder.certificatePinner(certificatePinner).build()
    }
}