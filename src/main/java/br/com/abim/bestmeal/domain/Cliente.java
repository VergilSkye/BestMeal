package br.com.abim.bestmeal.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

import br.com.abim.bestmeal.domain.enumeration.TipoPessoa;

import br.com.abim.bestmeal.domain.enumeration.TipoLogradouro;

/**
 * A Cliente.
 */
@Entity
@Table(name = "cliente")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Cliente implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo")
    private TipoPessoa tipo;

    @Column(name = "cpf")
    private String cpf;

    @Column(name = "cnpj")
    private String cnpj;

    @NotNull
    @Size(min = 2, max = 20)
    @Column(name = "primeiro_nome", length = 20, nullable = false)
    private String primeiroNome;

    @Size(min = 2, max = 30)
    @Column(name = "nome_meio", length = 30)
    private String nomeMeio;

    @Size(min = 2, max = 30)
    @Column(name = "sobre_nome", length = 30)
    private String sobreNome;

    @Column(name = "saudacao")
    private String saudacao;

    @Size(min = 3, max = 15)
    @Column(name = "titulo", length = 15)
    private String titulo;

    @Pattern(regexp = "^[0-9]{2}.[0-9]{3}-[0-9]{3}$")
    @Column(name = "cep")
    private String cep;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_logradouro")
    private TipoLogradouro tipoLogradouro;

    @NotNull
    @Size(min = 5, max = 100)
    @Column(name = "nome_logradouro", length = 100, nullable = false)
    private String nomeLogradouro;

    @NotNull
    @Size(min = 0, max = 30)
    @Column(name = "complemento", length = 30, nullable = false)
    private String complemento;

    @ManyToOne
    @JsonIgnoreProperties("municipio")
    private Municipio municipio;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TipoPessoa getTipo() {
        return tipo;
    }

    public Cliente tipo(TipoPessoa tipo) {
        this.tipo = tipo;
        return this;
    }

    public void setTipo(TipoPessoa tipo) {
        this.tipo = tipo;
    }

    public String getCpf() {
        return cpf;
    }

    public Cliente cpf(String cpf) {
        this.cpf = cpf;
        return this;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getCnpj() {
        return cnpj;
    }

    public Cliente cnpj(String cnpj) {
        this.cnpj = cnpj;
        return this;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getPrimeiroNome() {
        return primeiroNome;
    }

    public Cliente primeiroNome(String primeiroNome) {
        this.primeiroNome = primeiroNome;
        return this;
    }

    public void setPrimeiroNome(String primeiroNome) {
        this.primeiroNome = primeiroNome;
    }

    public String getNomeMeio() {
        return nomeMeio;
    }

    public Cliente nomeMeio(String nomeMeio) {
        this.nomeMeio = nomeMeio;
        return this;
    }

    public void setNomeMeio(String nomeMeio) {
        this.nomeMeio = nomeMeio;
    }

    public String getSobreNome() {
        return sobreNome;
    }

    public Cliente sobreNome(String sobreNome) {
        this.sobreNome = sobreNome;
        return this;
    }

    public void setSobreNome(String sobreNome) {
        this.sobreNome = sobreNome;
    }

    public String getSaudacao() {
        return saudacao;
    }

    public Cliente saudacao(String saudacao) {
        this.saudacao = saudacao;
        return this;
    }

    public void setSaudacao(String saudacao) {
        this.saudacao = saudacao;
    }

    public String getTitulo() {
        return titulo;
    }

    public Cliente titulo(String titulo) {
        this.titulo = titulo;
        return this;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getCep() {
        return cep;
    }

    public Cliente cep(String cep) {
        this.cep = cep;
        return this;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public TipoLogradouro getTipoLogradouro() {
        return tipoLogradouro;
    }

    public Cliente tipoLogradouro(TipoLogradouro tipoLogradouro) {
        this.tipoLogradouro = tipoLogradouro;
        return this;
    }

    public void setTipoLogradouro(TipoLogradouro tipoLogradouro) {
        this.tipoLogradouro = tipoLogradouro;
    }

    public String getNomeLogradouro() {
        return nomeLogradouro;
    }

    public Cliente nomeLogradouro(String nomeLogradouro) {
        this.nomeLogradouro = nomeLogradouro;
        return this;
    }

    public void setNomeLogradouro(String nomeLogradouro) {
        this.nomeLogradouro = nomeLogradouro;
    }

    public String getComplemento() {
        return complemento;
    }

    public Cliente complemento(String complemento) {
        this.complemento = complemento;
        return this;
    }

    public void setComplemento(String complemento) {
        this.complemento = complemento;
    }

    public Municipio getMunicipio() {
        return municipio;
    }

    public Cliente municipio(Municipio municipio) {
        this.municipio = municipio;
        return this;
    }

    public void setMunicipio(Municipio municipio) {
        this.municipio = municipio;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Cliente)) {
            return false;
        }
        return id != null && id.equals(((Cliente) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Cliente{" +
            "id=" + getId() +
            ", tipo='" + getTipo() + "'" +
            ", cpf='" + getCpf() + "'" +
            ", cnpj='" + getCnpj() + "'" +
            ", primeiroNome='" + getPrimeiroNome() + "'" +
            ", nomeMeio='" + getNomeMeio() + "'" +
            ", sobreNome='" + getSobreNome() + "'" +
            ", saudacao='" + getSaudacao() + "'" +
            ", titulo='" + getTitulo() + "'" +
            ", cep='" + getCep() + "'" +
            ", tipoLogradouro='" + getTipoLogradouro() + "'" +
            ", nomeLogradouro='" + getNomeLogradouro() + "'" +
            ", complemento='" + getComplemento() + "'" +
            "}";
    }
}
