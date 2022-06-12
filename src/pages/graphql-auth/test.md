```mermaid
flowchart TB
    web(\n Web \n\n):::class_client <==> gateway(\n Gateway \n\n):::class_gateway_component
    mobile(\n Mobile \n\n):::class_client <==> gateway
    gateway --> api(\n Api \n\n):::class_gql_component
    gateway --> ddi(\n DDI \n\n):::class_gql_component
    gateway --> psd2(\n PSD2 \n\n):::class_gql_component
    gateway --> pfm(\n PFM \n\n):::class_gql_component
    gateway --> savings(\n Savings \n\n):::class_gql_component


    classDef class_client color:#fff,fill:#007ed2,stroke:#000,stroke-width:2px
    classDef class_gateway_component color:#fff,fill:#d95959,stroke:#000,stroke-width:2px
    classDef class_gql_component color:#fff,fill:#388564,stroke:#000,stroke-width:2px
```

```mermaid
flowchart LR
    web(\n Web \n\n):::class_client <==> gateway(\n /graphql \n\n):::class_gql_component
    mobile(\n Mobile \n\n):::class_client <==> gateway
    subgraph gql[Gateway]
      gateway --> jwt(\n jwt verify \n\n):::class_gql_component
      jwt --> token(Expand permissions\nanyfin-acl\n):::class_gql_component
    end
    token <==> data(\n Subgraphs \n api,pfm,savings \n\n):::class_datalayer

    classDef class_client color:#fff,fill:#007ed2,stroke:#000,stroke-width:2px
    classDef class_gql_component color:#000,fill:#fff,stroke:#000,stroke-width:2px
    classDef class_datalayer color:#fff,fill:#388564,stroke:#000,stroke-width:2px
    style gql color:#fff,fill:#d95959,stroke:#000,stroke-width:2px
```

```json
Token ( JWT ): Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU4OZm…………YorfRxm8
```

<div>

```json
{
  "id": "e8988f90-6fef-11e9-9d75-b7a0d0de610a",
  "name": "Atul Ramachandran",
  "type": "admin",
  "roles": ["employee:readonly", "payment-admin"],
  "iat": 1654104898,
  "exp": 1656696898,
  "sub": "e8988f90-6fef-11e9-9d75-b7a0d0de610a"
}
```

```json
// Body of the request
{
  "query": "query GetUser{ user { id } }",
  "variables": {},
  "extensions": {
    "user": {
      "id": "e8988f90-6fef-11e9-9d75-b7a0d0de610a",
      "name": "Atul Ramachandran",
      "type": "admin",
      "roles": ["employee:readonly", "payment-admin"],
      "permissions": [
        "admin:list",
        "admin:self",
        "agreement:list",
        "application:list",
        "application:read:all",
        "cash-advance:read:all",
        "customer:impersonate",
        "customer:list",
        "customer:read:all",
        "identity:list",
        "lender:list"
      ]
    }
  }
}
```

</div>

```mermaid
flowchart LR
    gateway(\n Gateway \n\n):::class_client <==> schema(\n Schema \n\n):::class_gql_component
    subgraph gql[Subgraph: api, ddi, savings, psd2, pfm]
      schema --> context(\n Context \n\n):::class_gql_component
      context --> directives(\n Directives \n `auth` \n\n):::class_gql_component
      directives --> resolvers(\n Resolvers \n\n):::class_gql_component
    end
    resolvers <==> data[(\n Data \n Layer \n)]:::class_datalayer

    classDef class_client color:#fff,fill:#d95959,stroke:#000,stroke-width:2px
    classDef class_gql_component color:#000,fill:#fff,stroke:#000,stroke-width:2px
    classDef class_datalayer color:#fff,fill:grey,stroke:#000,stroke-width:2px
    style gql color:#fff,fill:#388564,stroke:#000,stroke-width:2px

```
