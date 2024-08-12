package com.arthurfontaine.myapplication.jsxon

import kotlinx.serialization.Serializable

@Serializable
data class JsxonPayload(
    val type: String,
    val props: Map<String, String>,
    val children: List<JsxonPayload>? = null
)
