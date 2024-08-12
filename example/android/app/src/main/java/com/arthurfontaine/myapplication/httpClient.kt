package com.arthurfontaine.myapplication

import io.ktor.client.*
import io.ktor.client.plugins.contentnegotiation.ContentNegotiation
import io.ktor.serialization.kotlinx.json.json
import kotlinx.serialization.json.Json
import io.ktor.client.engine.okhttp.*

val httpClient = HttpClient(OkHttp) {
    engine {
        config {
            followRedirects(true)
        }
    }

    install(ContentNegotiation) {
        json(Json {
            ignoreUnknownKeys = true
        })
    }
}
